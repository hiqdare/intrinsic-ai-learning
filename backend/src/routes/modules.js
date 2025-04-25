const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const Module = require('../models/Module');
const User = require('../models/User');
const auth = require('../../../../../../Downloads/missing_backend_files/middleware/auth');

// @route   GET api/modules
// @desc    Get all modules
// @access  Public
router.get('/', async (req, res) => {
  try {
    const modules = await Module.find({ isActive: true })
      .populate('createdBy', 'name avatar')
      .sort({ createdAt: -1 });
    
    res.json({
      success: true,
      data: modules
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      success: false,
      message: 'Server Fehler'
    });
  }
});

// @route   GET api/modules/:id
// @desc    Get module by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const module = await Module.findById(req.params.id)
      .populate('createdBy', 'name avatar')
      .populate('prerequisites');
    
    if (!module) {
      return res.status(404).json({
        success: false,
        message: 'Modul nicht gefunden'
      });
    }

    res.json({
      success: true,
      data: module
    });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({
        success: false,
        message: 'Modul nicht gefunden'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server Fehler'
    });
  }
});

// @route   POST api/modules
// @desc    Create a module
// @access  Private/Coach or Admin
router.post('/', [
  auth,
  check('title', 'Titel ist erforderlich').not().isEmpty(),
  check('description', 'Beschreibung ist erforderlich').not().isEmpty(),
  check('category', 'Kategorie ist erforderlich').not().isEmpty(),
  check('type', 'Typ ist erforderlich').not().isEmpty(),
  check('difficulty', 'Schwierigkeitsgrad ist erforderlich').not().isEmpty(),
  check('estimatedHours', 'Geschätzte Stunden sind erforderlich').isNumeric(),
  check('content', 'Inhalt ist erforderlich').not().isEmpty()
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
      type,
      difficulty,
      estimatedHours,
      content,
      resources,
      tasks,
      skills,
      prerequisites
    } = req.body;

    // Create new module
    const newModule = new Module({
      title,
      description,
      category,
      type,
      difficulty,
      estimatedHours,
      content,
      resources: resources || [],
      tasks: tasks || [],
      skills: skills || [],
      prerequisites: prerequisites || [],
      createdBy: req.user.id
    });

    const module = await newModule.save();

    res.json({
      success: true,
      data: module
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      success: false,
      message: 'Server Fehler'
    });
  }
});

// @route   PUT api/modules/:id
// @desc    Update a module
// @access  Private/Coach or Admin
router.put('/:id', [
  auth,
  check('title', 'Titel ist erforderlich').optional().not().isEmpty(),
  check('description', 'Beschreibung ist erforderlich').optional().not().isEmpty(),
  check('category', 'Kategorie ist erforderlich').optional().not().isEmpty(),
  check('type', 'Typ ist erforderlich').optional().not().isEmpty(),
  check('difficulty', 'Schwierigkeitsgrad ist erforderlich').optional().not().isEmpty(),
  check('estimatedHours', 'Geschätzte Stunden sind erforderlich').optional().isNumeric(),
  check('content', 'Inhalt ist erforderlich').optional().not().isEmpty()
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

    let module = await Module.findById(req.params.id);
    
    if (!module) {
      return res.status(404).json({
        success: false,
        message: 'Modul nicht gefunden'
      });
    }

    // Check if user is the creator or admin
    if (module.createdBy.toString() !== req.user.id && user.role !== 'admin') {
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
      type,
      difficulty,
      estimatedHours,
      content,
      resources,
      tasks,
      skills,
      prerequisites,
      isActive
    } = req.body;

    if (title) module.title = title;
    if (description) module.description = description;
    if (category) module.category = category;
    if (type) module.type = type;
    if (difficulty) module.difficulty = difficulty;
    if (estimatedHours) module.estimatedHours = estimatedHours;
    if (content) module.content = content;
    if (resources) module.resources = resources;
    if (tasks) module.tasks = tasks;
    if (skills) module.skills = skills;
    if (prerequisites) module.prerequisites = prerequisites;
    if (isActive !== undefined) module.isActive = isActive;

    await module.save();

    res.json({
      success: true,
      data: module
    });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({
        success: false,
        message: 'Modul nicht gefunden'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server Fehler'
    });
  }
});

// @route   DELETE api/modules/:id
// @desc    Delete a module
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

    const module = await Module.findById(req.params.id);
    
    if (!module) {
      return res.status(404).json({
        success: false,
        message: 'Modul nicht gefunden'
      });
    }

    await module.remove();

    res.json({
      success: true,
      message: 'Modul gelöscht'
    });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({
        success: false,
        message: 'Modul nicht gefunden'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server Fehler'
    });
  }
});

module.exports = router;
