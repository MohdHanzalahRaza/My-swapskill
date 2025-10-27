const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Protect routes - require authentication
const protect = async (req, res, next) => {
  try {
    let token;

    // Check for token in Authorization header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }
    // Check for token in cookies (if using cookie authentication)
    else if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
    }

    // Make sure token exists
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to access this route'
      });
    }

    try {
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from token
      const user = await User.findById(decoded.id).select('-password');

      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'User not found'
        });
      }

      // Check if user is active
      if (!user.isActive) {
        return res.status(401).json({
          success: false,
          message: 'User account is deactivated'
        });
      }

      // Update last active
      user.updateLastActive();

      req.user = user;
      next();
    } catch (error) {
      console.error('Token verification error:', error);
      return res.status(401).json({
        success: false,
        message: 'Invalid token'
      });
    }
  } catch (error) {
    console.error('Auth middleware error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error in authentication'
    });
  }
};

// Optional authentication - doesn't require token but sets user if present
const optionalAuth = async (req, res, next) => {
  try {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
    }

    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id).select('-password');
        
        if (user && user.isActive) {
          req.user = user;
          user.updateLastActive();
        }
      } catch (error) {
        // Invalid token, but continue without authentication
        console.log('Invalid token in optional auth:', error.message);
      }
    }

    next();
  } catch (error) {
    console.error('Optional auth middleware error:', error);
    next();
  }
};

// Grant access to specific roles
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to access this route'
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `User role ${req.user.role} is not authorized to access this route`
      });
    }

    next();
  };
};

// Check if user owns the resource or is admin
const ownership = (Model, userField = 'user') => {
  return async (req, res, next) => {
    try {
      const resource = await Model.findById(req.params.id);

      if (!resource) {
        return res.status(404).json({
          success: false,
          message: 'Resource not found'
        });
      }

      // Check ownership
      const resourceUserId = typeof resource[userField] === 'object' 
        ? resource[userField].toString() 
        : resource[userField];

      if (resourceUserId !== req.user.id.toString() && req.user.role !== 'admin') {
        return res.status(403).json({
          success: false,
          message: 'Not authorized to access this resource'
        });
      }

      req.resource = resource;
      next();
    } catch (error) {
      console.error('Ownership middleware error:', error);
      return res.status(500).json({
        success: false,
        message: 'Server error in ownership check'
      });
    }
  };
};

// Check if user can access skill swap (requester or provider)
const skillSwapAccess = async (req, res, next) => {
  try {
    const SkillSwap = require('../models/SkillSwap');
    const skillSwap = await SkillSwap.findById(req.params.id);

    if (!skillSwap) {
      return res.status(404).json({
        success: false,
        message: 'Skill swap not found'
      });
    }

    const userId = req.user.id.toString();
    const requesterId = skillSwap.requester.toString();
    const providerId = skillSwap.provider.toString();

    if (userId !== requesterId && userId !== providerId && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access this skill swap'
      });
    }

    req.skillSwap = skillSwap;
    next();
  } catch (error) {
    console.error('Skill swap access middleware error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error in skill swap access check'
    });
  }
};

// Rate limiting for sensitive operations
const rateLimit = require("express-rate-limit");
const { ipKeyGenerator } = require("express-rate-limit");

const sensitiveOpLimit = (windowMs = 15 * 60 * 1000, max = 5) => {
  return rateLimit({
    windowMs,
    max,
    message: {
      success: false,
      message: "Too many attempts, please try again later",
    },
    standardHeaders: true,
    legacyHeaders: false,

    // ✅ Safe IPv6-compatible key generator
    keyGenerator: (req) => {
      return req.user ? req.user.id : ipKeyGenerator(req);
    },
  });
};


// Verify email middleware
const requireEmailVerification = (req, res, next) => {
  if (!req.user.isEmailVerified) {
    return res.status(403).json({
      success: false,
      message: 'Please verify your email address to access this feature',
      requiresEmailVerification: true
    });
  }
  next();
};

// Check user preferences middleware
const checkUserPreferences = (action) => {
  return (req, res, next) => {
    if (!req.user) {
      return next();
    }

    const preferences = req.user.preferences;

    switch (action) {
      case 'messages':
        if (!preferences.allowMessages) {
          return res.status(403).json({
            success: false,
            message: 'User has disabled messages'
          });
        }
        break;
      case 'skill_requests':
        if (!preferences.allowSkillRequests) {
          return res.status(403).json({
            success: false,
            message: 'User has disabled skill requests'
          });
        }
        break;
      default:
        break;
    }

    next();
  };
};

module.exports = {
  protect,
  optionalAuth,
  authorize,
  ownership,
  skillSwapAccess,
  sensitiveOpLimit,
  requireEmailVerification,
  checkUserPreferences
};