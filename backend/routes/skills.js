const express = require('express');
const { protect, optionalAuth } = require('../middleware/auth');

const router = express.Router();

// @desc    Get all skills
// @route   GET /api/skills
// @access  Public
router.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Skills routes - Coming soon'
  });
});

// @desc    Search skills
// @route   GET /api/skills/search
// @access  Public
router.get('/search', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Search skills - Coming soon'
  });
});

module.exports = router;