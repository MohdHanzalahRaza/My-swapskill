const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  // Basic Information
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true,
    maxlength: [50, 'First name cannot be more than 50 characters']
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true,
    maxlength: [50, 'Last name cannot be more than 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please enter a valid email'
    ]
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters'],
    select: false
  },
  
  // Profile Information
  avatar: {
    type: String,
    default: null
  },
  bio: {
    type: String,
    maxlength: [500, 'Bio cannot be more than 500 characters']
  },
  location: {
    city: String,
    state: String,
    country: String
  },
  dateOfBirth: {
    type: Date
  },
  
  // Contact Information
  phone: {
    type: String,
    match: [/^\+?[\d\s\-\(\)]+$/, 'Please enter a valid phone number']
  },
  website: {
    type: String,
    match: [
      /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&=]*)$/,
      'Please enter a valid website URL'
    ]
  },
  socialLinks: {
    linkedin: String,
    twitter: String,
    github: String,
    portfolio: String
  },
  
  // Skills
  skillsOffered: [{
    name: {
      type: String,
      required: true
    },
    category: {
      type: String,
      required: true,
      enum: [
        'Technology',
        'Design',
        'Business',
        'Marketing',
        'Languages',
        'Music',
        'Sports',
        'Cooking',
        'Crafts',
        'Photography',
        'Writing',
        'Teaching',
        'Other'
      ]
    },
    level: {
      type: String,
      enum: ['Beginner', 'Intermediate', 'Advanced', 'Expert'],
      default: 'Intermediate'
    },
    description: String,
    yearsOfExperience: {
      type: Number,
      min: 0,
      max: 50
    }
  }],
  
  skillsWanted: [{
    name: {
      type: String,
      required: true
    },
    category: {
      type: String,
      required: true,
      enum: [
        'Technology',
        'Design',
        'Business',
        'Marketing',
        'Languages',
        'Music',
        'Sports',
        'Cooking',
        'Crafts',
        'Photography',
        'Writing',
        'Teaching',
        'Other'
      ]
    },
    level: {
      type: String,
      enum: ['Beginner', 'Intermediate', 'Advanced', 'Expert'],
      default: 'Beginner'
    },
    description: String,
    priority: {
      type: String,
      enum: ['Low', 'Medium', 'High'],
      default: 'Medium'
    }
  }],
  
  // Ratings and Reviews
  rating: {
    average: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    count: {
      type: Number,
      default: 0
    }
  },
  
  // Verification
  isEmailVerified: {
    type: Boolean,
    default: false
  },
  emailVerificationToken: String,
  isPhoneVerified: {
    type: Boolean,
    default: false
  },
  
  // Preferences
  preferences: {
    allowMessages: {
      type: Boolean,
      default: true
    },
    allowSkillRequests: {
      type: Boolean,
      default: true
    },
    emailNotifications: {
      type: Boolean,
      default: true
    },
    maxDistance: {
      type: Number,
      default: 50, // kilometers
      min: 1,
      max: 1000
    },
    preferredMeetingType: {
      type: String,
      enum: ['In-person', 'Online', 'Both'],
      default: 'Both'
    }
  },
  
  // Account Status
  isActive: {
    type: Boolean,
    default: true
  },
  lastActive: {
    type: Date,
    default: Date.now
  },
  
  // Reset Password
  resetPasswordToken: String,
  resetPasswordExpire: Date

}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for full name
userSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`;
});

// Virtual for age
userSchema.virtual('age').get(function() {
  if (!this.dateOfBirth) return null;
  const today = new Date();
  const birthDate = new Date(this.dateOfBirth);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  
  return age;
});

// Index for search optimization
userSchema.index({ email: 1 });
userSchema.index({ 'skillsOffered.name': 'text', 'skillsWanted.name': 'text' });
userSchema.index({ 'location.city': 1, 'location.state': 1, 'location.country': 1 });

// Pre-save middleware to hash password
userSchema.pre('save', async function(next) {
  // Only hash the password if it has been modified (or is new)
  if (!this.isModified('password')) return next();
  
  try {
    // Hash password with cost of 12
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare password
userSchema.methods.comparePassword = async function(candidatePassword) {
  if (!this.password) return false;
  return await bcrypt.compare(candidatePassword, this.password);
};

// Method to update last active
userSchema.methods.updateLastActive = function() {
  this.lastActive = new Date();
  return this.save({ validateBeforeSave: false });
};

module.exports = mongoose.model('User', userSchema);