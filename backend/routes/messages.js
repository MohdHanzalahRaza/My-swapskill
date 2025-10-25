const express = require('express');
const { protect } = require('../middleware/auth');

const router = express.Router();

// @desc    Get user messages
// @route   GET /api/messages
// @access  Private
router.get('/', protect, (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Messages routes - Coming soon'
  });
});

// @desc    Send message
// @route   POST /api/messages
// @access  Private
router.post('/', protect, (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Send message - Coming soon'
  });
});

module.exports = router;