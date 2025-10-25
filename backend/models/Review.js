const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  // Review relationships
  skillSwap: {
    type: mongoose.Schema.ObjectId,
    ref: 'SkillSwap',
    required: [true, 'Review must be associated with a skill swap']
  },
  
  reviewer: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Review must have a reviewer']
  },
  
  reviewee: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Review must have a reviewee']
  },
  
  // Rating (1-5 stars)
  rating: {
    type: Number,
    required: [true, 'Rating is required'],
    min: [1, 'Rating must be at least 1'],
    max: [5, 'Rating cannot be more than 5']
  },
  
  // Review content
  title: {
    type: String,
    required: [true, 'Review title is required'],
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  
  comment: {
    type: String,
    required: [true, 'Review comment is required'],
    maxlength: [1000, 'Comment cannot be more than 1000 characters']
  },
  
  // Detailed ratings
  skillRating: {
    expertise: {
      type: Number,
      min: 1,
      max: 5
    },
    communication: {
      type: Number,
      min: 1,
      max: 5
    },
    reliability: {
      type: Number,
      min: 1,
      max: 5
    },
    helpfulness: {
      type: Number,
      min: 1,
      max: 5
    }
  },
  
  // Review type
  type: {
    type: String,
    enum: ['skill_provider', 'skill_learner'],
    required: true
  },
  
  // Tags for categorizing reviews
  tags: [{
    type: String,
    enum: [
      'excellent_teacher',
      'patient',
      'knowledgeable',
      'well_prepared',
      'punctual',
      'friendly',
      'professional',
      'clear_communication',
      'helpful_resources',
      'practical_examples',
      'good_listener',
      'encouraging',
      'flexible_schedule',
      'exceeded_expectations'
    ]
  }],
  
  // Verification
  isVerified: {
    type: Boolean,
    default: false
  },
  
  verifiedAt: Date,
  
  // Moderation
  isReported: {
    type: Boolean,
    default: false
  },
  
  reportCount: {
    type: Number,
    default: 0
  },
  
  isHidden: {
    type: Boolean,
    default: false
  },
  
  moderationNotes: String,
  
  // Helpful votes
  helpfulVotes: {
    type: Number,
    default: 0
  },
  
  votedBy: [{
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User'
    },
    helpful: Boolean
  }],
  
  // Response from reviewee
  response: {
    comment: {
      type: String,
      maxlength: [500, 'Response cannot be more than 500 characters']
    },
    createdAt: Date
  }

}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for average detailed rating
reviewSchema.virtual('averageDetailedRating').get(function() {
  if (!this.skillRating) return null;
  
  const ratings = Object.values(this.skillRating).filter(rating => rating !== undefined);
  if (ratings.length === 0) return null;
  
  const sum = ratings.reduce((acc, rating) => acc + rating, 0);
  return Math.round((sum / ratings.length) * 10) / 10;
});

// Virtual for is recent (within last 30 days)
reviewSchema.virtual('isRecent').get(function() {
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  return this.createdAt >= thirtyDaysAgo;
});

// Indexes
reviewSchema.index({ skillSwap: 1, reviewer: 1 }, { unique: true }); // One review per user per swap
reviewSchema.index({ reviewee: 1, rating: -1 });
reviewSchema.index({ createdAt: -1 });
reviewSchema.index({ isVerified: 1, isHidden: 1 });

// Compound index for efficient queries
reviewSchema.index({ 
  reviewee: 1, 
  isHidden: 1, 
  isVerified: 1, 
  createdAt: -1 
});

// Pre-save middleware
reviewSchema.pre('save', function(next) {
  // Auto-verify if detailed ratings are provided
  if (this.skillRating && 
      this.skillRating.expertise && 
      this.skillRating.communication && 
      this.skillRating.reliability && 
      this.skillRating.helpfulness) {
    this.isVerified = true;
    this.verifiedAt = new Date();
  }
  
  next();
});

// Post-save middleware to update user rating
reviewSchema.post('save', async function() {
  try {
    await this.constructor.calculateUserRating(this.reviewee);
  } catch (error) {
    console.error('Error updating user rating:', error);
  }
});

// Post-remove middleware to update user rating
reviewSchema.post('remove', async function() {
  try {
    await this.constructor.calculateUserRating(this.reviewee);
  } catch (error) {
    console.error('Error updating user rating after review removal:', error);
  }
});

// Static method to calculate and update user's average rating
reviewSchema.statics.calculateUserRating = async function(userId) {
  const User = mongoose.model('User');
  
  const stats = await this.aggregate([
    {
      $match: { 
        reviewee: mongoose.Types.ObjectId(userId),
        isHidden: false
      }
    },
    {
      $group: {
        _id: '$reviewee',
        averageRating: { $avg: '$rating' },
        ratingCount: { $sum: 1 }
      }
    }
  ]);
  
  if (stats.length > 0) {
    await User.findByIdAndUpdate(userId, {
      'rating.average': Math.round(stats[0].averageRating * 10) / 10,
      'rating.count': stats[0].ratingCount
    });
  } else {
    await User.findByIdAndUpdate(userId, {
      'rating.average': 0,
      'rating.count': 0
    });
  }
};

// Static method to get user reviews with pagination
reviewSchema.statics.getUserReviews = function(userId, page = 1, limit = 10) {
  const skip = (page - 1) * limit;
  
  return this.find({ 
    reviewee: userId, 
    isHidden: false 
  })
  .populate('reviewer', 'firstName lastName avatar')
  .populate('skillSwap', 'skillOffered skillRequested')
  .sort({ createdAt: -1 })
  .skip(skip)
  .limit(limit);
};

// Instance method to vote helpful
reviewSchema.methods.voteHelpful = function(userId, isHelpful) {
  // Remove existing vote if any
  this.votedBy = this.votedBy.filter(vote => 
    vote.user.toString() !== userId.toString()
  );
  
  // Add new vote
  this.votedBy.push({
    user: userId,
    helpful: isHelpful
  });
  
  // Recalculate helpful votes
  this.helpfulVotes = this.votedBy.filter(vote => vote.helpful).length;
  
  return this.save();
};

// Instance method to add response
reviewSchema.methods.addResponse = function(responseText) {
  this.response = {
    comment: responseText,
    createdAt: new Date()
  };
  
  return this.save();
};

// Instance method to report review
reviewSchema.methods.report = function() {
  this.isReported = true;
  this.reportCount += 1;
  
  // Auto-hide if too many reports
  if (this.reportCount >= 5) {
    this.isHidden = true;
    this.moderationNotes = 'Auto-hidden due to multiple reports';
  }
  
  return this.save();
};

module.exports = mongoose.model('Review', reviewSchema);