const express = require('express');
const { protect, optionalAuth } = require('../middleware/auth');

const router = express.Router();

// @desc    Get all users (public profiles)
// @route   GET /api/users
// @access  Public
router.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Users routes - Coming soon'
  });
});

// @desc    Get user profile by ID
// @route   GET /api/users/:id
// @access  Public
router.get('/:id', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Get user profile - Coming soon'
  });
});

// @desc    Update user profile
// @route   PUT /api/users/:id
// @access  Private
router.put('/:id', protect, (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Update user profile - Coming soon'
  });
});

module.exports = router;