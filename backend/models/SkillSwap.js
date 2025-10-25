const mongoose = require('mongoose');

const skillSwapSchema = new mongoose.Schema({
  // Participants
  requester: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Skill swap must have a requester']
  },
  provider: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Skill swap must have a provider']
  },
  
  // Skills being exchanged
  skillOffered: {
    name: {
      type: String,
      required: [true, 'Skill offered name is required']
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
    description: String
  },
  
  skillRequested: {
    name: {
      type: String,
      required: [true, 'Skill requested name is required']
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
    description: String
  },
  
  // Request details
  title: {
    type: String,
    required: [true, 'Skill swap title is required'],
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  
  description: {
    type: String,
    required: [true, 'Skill swap description is required'],
    maxlength: [1000, 'Description cannot be more than 1000 characters']
  },
  
  // Status management
  status: {
    type: String,
    enum: [
      'pending',      // Initial request sent
      'accepted',     // Provider accepted the request
      'rejected',     // Provider rejected the request
      'in_progress',  // Skill exchange is happening
      'completed',    // Exchange completed successfully
      'cancelled'     // Cancelled by either party
    ],
    default: 'pending'
  },
  
  // Timing
  proposedStartDate: {
    type: Date,
    required: [true, 'Proposed start date is required']
  },
  
  proposedEndDate: {
    type: Date,
    required: [true, 'Proposed end date is required']
  },
  
  actualStartDate: Date,
  actualEndDate: Date,
  
  // Meeting preferences
  meetingType: {
    type: String,
    enum: ['In-person', 'Online', 'Hybrid'],
    required: [true, 'Meeting type is required']
  },
  
  location: {
    type: String,
    required: function() {
      return this.meetingType === 'In-person' || this.meetingType === 'Hybrid';
    }
  },
  
  onlineDetails: {
    platform: String, // Zoom, Google Meet, etc.
    link: String
  },
  
  // Duration and schedule
  estimatedHours: {
    requesterTime: {
      type: Number,
      required: true,
      min: [0.5, 'Minimum time is 0.5 hours']
    },
    providerTime: {
      type: Number,
      required: true,
      min: [0.5, 'Minimum time is 0.5 hours']
    }
  },
  
  schedule: [{
    date: {
      type: Date,
      required: true
    },
    startTime: {
      type: String,
      required: true
    },
    endTime: {
      type: String,
      required: true
    },
    description: String,
    completed: {
      type: Boolean,
      default: false
    }
  }],
  
  // Progress tracking
  milestones: [{
    title: {
      type: String,
      required: true
    },
    description: String,
    dueDate: Date,
    completed: {
      type: Boolean,
      default: false
    },
    completedDate: Date,
    completedBy: {
      type: mongoose.Schema.ObjectId,
      ref: 'User'
    }
  }],
  
  // Communication
  notes: {
    requesterNotes: String,
    providerNotes: String,
    adminNotes: String
  },
  
  // Completion and feedback
  completion: {
    requesterConfirmed: {
      type: Boolean,
      default: false
    },
    providerConfirmed: {
      type: Boolean,
      default: false
    },
    completedAt: Date
  },
  
  // Reviews (will be populated from Review model)
  reviews: [{
    type: mongoose.Schema.ObjectId,
    ref: 'Review'
  }],
  
  // Metadata
  tags: [String],
  priority: {
    type: String,
    enum: ['Low', 'Medium', 'High'],
    default: 'Medium'
  },
  
  // Tracking
  viewCount: {
    type: Number,
    default: 0
  },
  
  lastActivity: {
    type: Date,
    default: Date.now
  }

}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for duration in days
skillSwapSchema.virtual('durationDays').get(function() {
  if (!this.proposedStartDate || !this.proposedEndDate) return 0;
  const diffTime = Math.abs(this.proposedEndDate - this.proposedStartDate);
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
});

// Virtual for total estimated hours
skillSwapSchema.virtual('totalEstimatedHours').get(function() {
  return this.estimatedHours.requesterTime + this.estimatedHours.providerTime;
});

// Virtual for completion percentage
skillSwapSchema.virtual('completionPercentage').get(function() {
  if (!this.milestones || this.milestones.length === 0) return 0;
  const completedMilestones = this.milestones.filter(m => m.completed).length;
  return Math.round((completedMilestones / this.milestones.length) * 100);
});

// Virtual for is active
skillSwapSchema.virtual('isActive').get(function() {
  return ['accepted', 'in_progress'].includes(this.status);
});

// Indexes for performance
skillSwapSchema.index({ requester: 1, provider: 1 });
skillSwapSchema.index({ status: 1 });
skillSwapSchema.index({ 'skillOffered.category': 1, 'skillRequested.category': 1 });
skillSwapSchema.index({ proposedStartDate: 1, proposedEndDate: 1 });
skillSwapSchema.index({ createdAt: -1 });

// Pre-save middleware
skillSwapSchema.pre('save', function(next) {
  // Update last activity
  this.lastActivity = new Date();
  
  // Validate dates
  if (this.proposedStartDate && this.proposedEndDate) {
    if (this.proposedStartDate >= this.proposedEndDate) {
      return next(new Error('End date must be after start date'));
    }
  }
  
  // Auto-complete if both parties confirmed
  if (this.completion.requesterConfirmed && 
      this.completion.providerConfirmed && 
      this.status !== 'completed') {
    this.status = 'completed';
    this.completion.completedAt = new Date();
    this.actualEndDate = new Date();
  }
  
  next();
});

// Static method to find swaps for a user
skillSwapSchema.statics.findUserSwaps = function(userId, status = null) {
  const query = {
    $or: [
      { requester: userId },
      { provider: userId }
    ]
  };
  
  if (status) {
    query.status = status;
  }
  
  return this.find(query)
    .populate('requester', 'firstName lastName avatar rating')
    .populate('provider', 'firstName lastName avatar rating')
    .sort({ createdAt: -1 });
};

// Method to check if user can modify this swap
skillSwapSchema.methods.canModify = function(userId) {
  return this.requester.toString() === userId.toString() || 
         this.provider.toString() === userId.toString();
};

// Method to update status
skillSwapSchema.methods.updateStatus = function(newStatus, userId) {
  // Validate status transitions
  const validTransitions = {
    'pending': ['accepted', 'rejected', 'cancelled'],
    'accepted': ['in_progress', 'cancelled'],
    'in_progress': ['completed', 'cancelled'],
    'rejected': [],
    'completed': [],
    'cancelled': []
  };
  
  if (!validTransitions[this.status].includes(newStatus)) {
    throw new Error(`Cannot transition from ${this.status} to ${newStatus}`);
  }
  
  this.status = newStatus;
  
  if (newStatus === 'in_progress' && !this.actualStartDate) {
    this.actualStartDate = new Date();
  }
  
  if (newStatus === 'completed' && !this.actualEndDate) {
    this.actualEndDate = new Date();
  }
  
  return this.save();
};

module.exports = mongoose.model('SkillSwap', skillSwapSchema);