const express = require('express');
const { protect, skillSwapAccess } = require('../middleware/auth');

const router = express.Router();

// @desc    Get all skill swaps for user
// @route   GET /api/swaps
// @access  Private
router.get('/', protect, (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Skill swaps routes - Coming soon'
  });
});

// @desc    Create new skill swap request
// @route   POST /api/swaps
// @access  Private
router.post('/', protect, (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Create skill swap - Coming soon'
  });
});

// @desc    Get skill swap by ID
// @route   GET /api/swaps/:id
// @access  Private
router.get('/:id', protect, skillSwapAccess, (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Get skill swap - Coming soon'
  });
});

module.exports = router;