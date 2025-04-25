const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const User = require('../models/User');
const auth = require('../../../../../../Downloads/missing_backend_files/middleware/auth');

// @route   GET api/users
// @desc    Get all users (admin only)
// @access  Private/Admin
router.get('/', auth, async (req, res) => {
  try {
    // Check if user is admin
    const user = await User.findById(req.user.id);
    if (user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Zugriff verweigert'
      });
    }

    const users = await User.find().select('-password');
    res.json({
      success: true,
      data: users
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      success: false,
      message: 'Server Fehler'
    });
  }
});

// @route   GET api/users/me
// @desc    Get current user profile
// @access  Private
router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .select('-password')
      .populate('learningPaths')
      .populate('completedModules');
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Benutzer nicht gefunden'
      });
    }

    res.json({
      success: true,
      data: user
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      success: false,
      message: 'Server Fehler'
    });
  }
});

// @route   GET api/users/:id
// @desc    Get user by ID
// @access  Private/Coach or Admin
router.get('/:id', auth, async (req, res) => {
  try {
    // Check if user is coach or admin
    const currentUser = await User.findById(req.user.id);
    if (currentUser.role !== 'coach' && currentUser.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Zugriff verweigert'
      });
    }

    const user = await User.findById(req.params.id)
      .select('-password')
      .populate('learningPaths')
      .populate('completedModules');
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Benutzer nicht gefunden'
      });
    }

    res.json({
      success: true,
      data: user
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      success: false,
      message: 'Server Fehler'
    });
  }
});

// @route   PUT api/users/me
// @desc    Update current user profile
// @access  Private
router.put('/me', [
  auth,
  check('name', 'Name ist erforderlich').optional().not().isEmpty(),
  check('skills', 'Skills müssen ein Array sein').optional().isArray(),
  check('interests', 'Interessen müssen ein Array sein').optional().isArray()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array()
    });
  }

  const { name, avatar, skills, interests } = req.body;

  try {
    const user = await User.findById(req.user.id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Benutzer nicht gefunden'
      });
    }

    // Update fields
    if (name) user.name = name;
    if (avatar) user.avatar = avatar;
    if (skills) user.skills = skills;
    if (interests) user.interests = interests;
    
    user.lastActivity = Date.now();
    
    await user.save();

    res.json({
      success: true,
      data: user
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      success: false,
      message: 'Server Fehler'
    });
  }
});

module.exports = router;
