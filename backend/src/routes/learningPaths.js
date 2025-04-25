const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const LearningPath = require('../models/LearningPath');
const Module = require('../models/Module');
const User = require('../models/User');
const auth = require('../../../../../../Downloads/missing_backend_files/middleware/auth');

// @route   GET api/learning-paths
// @desc    Get all learning paths
// @access  Public
router.get('/', async (req, res) => {
  try {
    const learningPaths = await LearningPath.find({ isActive: true })
      .populate('createdBy', 'name avatar')
      .sort({ createdAt: -1 });
    
    res.json({
      success: true,
      data: learningPaths
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      success: false,
      message: 'Server Fehler'
    });
  }
});

// @route   GET api/learning-paths/:id
// @desc    Get learning path by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const learningPath = await LearningPath.findById(req.params.id)
      .populate('createdBy', 'name avatar')
      .populate('modules');
    
    if (!learningPath) {
      return res.status(404).json({
        success: false,
        message: 'Lernpfad nicht gefunden'
      });
    }

    res.json({
      success: true,
      data: learningPath
    });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({
        success: false,
        message: 'Lernpfad nicht gefunden'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server Fehler'
    });
  }
});

// @route   POST api/learning-paths
// @desc    Create a learning path
// @access  Private/Coach or Admin
router.post('/', [
  auth,
  check('title', 'Titel ist erforderlich').not().isEmpty(),
  check('description', 'Beschreibung ist erforderlich').not().isEmpty(),
  check('category', 'Kategorie ist erforderlich').not().isEmpty(),
  check('difficulty', 'Schwierigkeitsgrad ist erforderlich').not().isEmpty(),
  check('estimatedHours', 'Geschätzte Stunden sind erforderlich').isNumeric()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array()
    });
  }

  try {
    // Check if user is coach or admin
    const user = await User.findById(req.user.id);
    if (user.role !== 'coach' && user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Zugriff verweigert'
      });
    }

    const {
      title,
      description,
      category,
      difficulty,
      estimatedHours,
      modules,
      skills,
      prerequisites
    } = req.body;

    // Create new learning path
    const newLearningPath = new LearningPath({
      title,
      description,
      category,
      difficulty,
      estimatedHours,
      modules: modules || [],
      skills: skills || [],
      prerequisites: prerequisites || [],
      createdBy: req.user.id
    });

    const learningPath = await newLearningPath.save();

    res.json({
      success: true,
      data: learningPath
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      success: false,
      message: 'Server Fehler'
    });
  }
});

// @route   PUT api/learning-paths/:id
// @desc    Update a learning path
// @access  Private/Coach or Admin
router.put('/:id', [
  auth,
  check('title', 'Titel ist erforderlich').optional().not().isEmpty(),
  check('description', 'Beschreibung ist erforderlich').optional().not().isEmpty(),
  check('category', 'Kategorie ist erforderlich').optional().not().isEmpty(),
  check('difficulty', 'Schwierigkeitsgrad ist erforderlich').optional().not().isEmpty(),
  check('estimatedHours', 'Geschätzte Stunden sind erforderlich').optional().isNumeric()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array()
    });
  }

  try {
    // Check if user is coach or admin
    const user = await User.findById(req.user.id);
    if (user.role !== 'coach' && user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Zugriff verweigert'
      });
    }

    let learningPath = await LearningPath.findById(req.params.id);
    
    if (!learningPath) {
      return res.status(404).json({
        success: false,
        message: 'Lernpfad nicht gefunden'
      });
    }

    // Check if user is the creator or admin
    if (learningPath.createdBy.toString() !== req.user.id && user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Zugriff verweigert'
      });
    }

    // Update fields
    const {
      title,
      description,
      category,
      difficulty,
      estimatedHours,
      modules,
      skills,
      prerequisites,
      isActive
    } = req.body;

    if (title) learningPath.title = title;
    if (description) learningPath.description = description;
    if (category) learningPath.category = category;
    if (difficulty) learningPath.difficulty = difficulty;
    if (estimatedHours) learningPath.estimatedHours = estimatedHours;
    if (modules) learningPath.modules = modules;
    if (skills) learningPath.skills = skills;
    if (prerequisites) learningPath.prerequisites = prerequisites;
    if (isActive !== undefined) learningPath.isActive = isActive;

    await learningPath.save();

    res.json({
      success: true,
      data: learningPath
    });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({
        success: false,
        message: 'Lernpfad nicht gefunden'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server Fehler'
    });
  }
});

// @route   DELETE api/learning-paths/:id
// @desc    Delete a learning path
// @access  Private/Admin
router.delete('/:id', auth, async (req, res) => {
  try {
    // Check if user is admin
    const user = await User.findById(req.user.id);
    if (user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Zugriff verweigert'
      });
    }

    const learningPath = await LearningPath.findById(req.params.id);
    
    if (!learningPath) {
      return res.status(404).json({
        success: false,
        message: 'Lernpfad nicht gefunden'
      });
    }

    await learningPath.remove();

    res.json({
      success: true,
      message: 'Lernpfad gelöscht'
    });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({
        success: false,
        message: 'Lernpfad nicht gefunden'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server Fehler'
    });
  }
});

module.exports = router;
