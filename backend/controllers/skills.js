const Skill = require('../models/Skill');

/**
 * Create a new skill
 */
exports.createSkill = async (req, res, next) => {
  try {
    const { title, category, level, description, location } = req.body;

    if (!title || title.trim().length < 2) {
      return res.status(400).json({ success: false, message: 'Title is required and must be at least 2 characters' });
    }

    const payload = {
      user: req.user.id,
      title: title.trim(),
      category: category || 'Other',
      level: level || 'Intermediate',
      description: description ? description.trim() : '',
      location: location || {}
    };

    const skill = await Skill.create(payload);
    res.status(201).json({ success: true, data: skill });
  } catch (err) {
    next(err);
  }
};

/**
 * Get current user's skills
 */
exports.getMySkills = async (req, res, next) => {
  try {
    const skills = await Skill.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: skills.length, data: skills });
  } catch (err) {
    next(err);
  }
};

/**
 * Browse skills (public)
 */
exports.getSkills = async (req, res, next) => {
  try {
    const { q, category, level, page = 1, limit = 20, excludeMy = 'true' } = req.query;
    const filter = {};

    if (q) {
      filter.$text = { $search: q };
    }
    if (category) filter.category = category;
    if (level) filter.level = level;
    if (excludeMy === 'true' && req.user) filter.user = { $ne: req.user.id };

    const skip = (Number(page) - 1) * Number(limit);

    const skills = await Skill.find(filter)
      .populate('user', 'firstName lastName avatar')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    const total = await Skill.countDocuments(filter);

    res.status(200).json({ success: true, count: skills.length, total, page: Number(page), data: skills });
  } catch (err) {
    next(err);
  }
};

/**
 * Update skill (owner only)
 */
exports.updateSkill = async (req, res, next) => {
  try {
    const skill = await Skill.findById(req.params.id);
    if (!skill) return res.status(404).json({ success: false, message: 'Skill not found' });
    if (skill.user.toString() !== req.user.id) return res.status(403).json({ success: false, message: 'Not authorized' });

    const { title, category, level, description, location } = req.body;
    if (title !== undefined) skill.title = title;
    if (category !== undefined) skill.category = category;
    if (level !== undefined) skill.level = level;
    if (description !== undefined) skill.description = description;
    if (location !== undefined) skill.location = location;

    await skill.save();
    res.status(200).json({ success: true, data: skill });
  } catch (err) {
    next(err);
  }
};

/**
 * Delete skill (owner only)
 */
exports.deleteSkill = async (req, res, next) => {
  try {
    const skill = await Skill.findById(req.params.id);
    if (!skill) return res.status(404).json({ success: false, message: 'Skill not found' });
    if (skill.user.toString() !== req.user.id) return res.status(403).json({ success: false, message: 'Not authorized' });

    await skill.remove();
    res.status(200).json({ success: true, message: 'Skill removed' });
  } catch (err) {
    next(err);
  }
};
