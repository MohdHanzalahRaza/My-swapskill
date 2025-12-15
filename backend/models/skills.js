const mongoose = require('mongoose');

const SkillSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true, trim: true },
  category: { type: String, default: 'Other', trim: true },
  level: { type: String, enum: ['Beginner','Intermediate','Advanced','Expert'], default: 'Intermediate' },
  description: { type: String, default: '', maxlength: 2000 },
  location: {
    city: { type: String, default: '' },
    country: { type: String, default: '' }
  },
  createdAt: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Skill', SkillSchema);
