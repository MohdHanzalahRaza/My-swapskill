const express = require('express');
const { body } = require('express-validator');

const router = express.Router();

// Attempt to require the skills controller safely.
// If it fails, capture the error and create fallback handlers so the server does not crash.
let controllers = null;
let controllerLoadError = null;

try {
  controllers = require('../controllers/skills');
} catch (err) {
  controllerLoadError = err;
  console.error('⚠️ Failed to load controllers/skills.js:', err && err.stack ? err.stack.split('\n').slice(0,6).join('\n') : err);
  // controllers will remain null and fallback handlers below will return 501
}

// Try to require auth middleware safely; provide conservative fallbacks if not available
let protect = null;
let optionalAuth = null;
try {
  const auth = require('../middleware/auth');
  protect = auth.protect;
  optionalAuth = auth.optionalAuth || ((req, res, next) => next());
} catch (err) {
  console.warn('⚠️ middleware/auth could not be loaded as expected. Using safe fallbacks. Error:', err && err.message);
  // fallback protect: allow requests but mark as unauthorized in handlers if req.user is missing
  protect = (req, res, next) => {
    // if your app sets req.user upstream, this fallback won't block; it's conservative.
    if (!req.user) {
      // we still allow route to run but handlers should check req.user; for now, set a flag
      req._protectFallback = true;
    }
    next();
  };
  optionalAuth = (req, res, next) => next();
}

// Helper fallback used when controller is missing
const notImplemented = (req, res) => {
  const msg = controllerLoadError
    ? `Skills controller not available. Check backend/controllers/skills.js. Error: ${controllerLoadError.message}`
    : 'Skills controller not implemented.';
  return res.status(501).json({ success: false, message: msg });
};

// ========== Routes ==========

// Browse skills (public-ish)
router.get('/', optionalAuth, async (req, res, next) => {
  if (!controllers || !controllers.getSkills) return notImplemented(req, res);
  try { return controllers.getSkills(req, res, next); } catch (err) { next(err); }
});

// Get my skills (protected)
router.get('/me', protect, async (req, res, next) => {
  if (!controllers || !controllers.getMySkills) return notImplemented(req, res);
  // If protect fallback flagged missing auth, return 401
  if (req._protectFallback && !req.user) return res.status(401).json({ success: false, message: 'Unauthorized (auth middleware missing or not setting req.user).' });
  try { return controllers.getMySkills(req, res, next); } catch (err) { next(err); }
});

// Create a skill (protected)
router.post(
  '/',
  protect,
  [
    body('title').trim().notEmpty().withMessage('Title is required').isLength({ min: 2 }).withMessage('Title must be at least 2 characters'),
    body('category').optional().isString(),
    body('level').optional().isIn(['Beginner','Intermediate','Advanced','Expert'])
  ],
  async (req, res, next) => {
    if (!controllers || !controllers.createSkill) return notImplemented(req, res);
    if (req._protectFallback && !req.user) return res.status(401).json({ success: false, message: 'Unauthorized (auth middleware missing or not setting req.user).' });
    try { return controllers.createSkill(req, res, next); } catch (err) { next(err); }
  }
);

// Update skill
router.put('/:id', protect, async (req, res, next) => {
  if (!controllers || !controllers.updateSkill) return notImplemented(req, res);
  if (req._protectFallback && !req.user) return res.status(401).json({ success: false, message: 'Unauthorized (auth middleware missing or not setting req.user).' });
  try { return controllers.updateSkill(req, res, next); } catch (err) { next(err); }
});

// Delete skill
router.delete('/:id', protect, async (req, res, next) => {
  if (!controllers || !controllers.deleteSkill) return notImplemented(req, res);
  if (req._protectFallback && !req.user) return res.status(401).json({ success: false, message: 'Unauthorized (auth middleware missing or not setting req.user).' });
  try { return controllers.deleteSkill(req, res, next); } catch (err) { next(err); }
});

module.exports = router;
