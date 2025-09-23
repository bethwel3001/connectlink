const express = require('express');
const asyncHandler = require('../utils/asyncHandler');
const { protect } = require('../middleware/auth');
const Opportunity = require('../models/Opportunity');

const router = express.Router();

// @desc    Get all opportunities
// @route   GET /api/opportunities
// @access  Public
router.get('/', asyncHandler(async (req, res) => {
  const opportunities = await Opportunity.find({ status: 'open' })
    .populate('organization', 'firstName lastName')
    .sort('-createdAt');

  res.json({
    success: true,
    data: opportunities
  });
}));

// @desc    Create opportunity
// @route   POST /api/opportunities
// @access  Private
router.post('/', protect, asyncHandler(async (req, res) => {
  if (req.user.userType !== 'organization') {
    return res.status(403).json({
      success: false,
      message: 'Only organizations can create opportunities'
    });
  }

  const opportunity = await Opportunity.create({
    ...req.body,
    organization: req.user.id,
    organizationName: req.user.firstName + ' ' + req.user.lastName
  });

  res.status(201).json({
    success: true,
    data: opportunity
  });
}));

module.exports = router;