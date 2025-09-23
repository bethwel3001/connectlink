const express = require('express');
const asyncHandler = require('../utils/asyncHandler');
const { protect } = require('../middleware/auth');
const User = require('../models/User');
const Opportunity = require('../models/Opportunity');

const router = express.Router();

// Protect all routes
router.use(protect);

// @desc    Get user dashboard
// @route   GET /api/users/dashboard
// @access  Private
router.get('/dashboard', asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  
  // Get opportunities (simplified for now)
  const opportunities = await Opportunity.find({ status: 'open' })
    .populate('organization', 'firstName lastName')
    .limit(10)
    .sort('-createdAt');

  res.json({
    success: true,
    data: {
      user: user.toJSON(),
      opportunities,
      stats: {
        totalOpportunities: opportunities.length,
        nearbyPeople: 15,
        activeApplications: 2
      }
    }
  });
}));

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
router.put('/profile', asyncHandler(async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.user.id,
    { ...req.body, profileCompleted: true },
    { new: true, runValidators: true }
  );

  res.json({
    success: true,
    data: {
      user: user.toJSON()
    }
  });
}));

module.exports = router;