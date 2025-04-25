const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const Project = require('../models/Project');
const Module = require('../models/Module');
const User = require('../models/User');
const auth = require('../../../../../../Downloads/missing_backend_files/middleware/auth');

// @route   GET api/projects
// @desc    Get all projects (coach/admin) or user's projects (student)
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    
    let projects;
    
    // If user is student, return only their projects
    if (user.role === 'student') {
      projects = await Project.find({ student: req.user.id })
        .populate('module', 'title description')
        .populate('student', 'name avatar')
        .populate('coach', 'name avatar')
        .sort({ updatedAt: -1 });
    } 
    // If user is coach, return projects they are coaching
    else if (user.role === 'coach') {
      projects = await Project.find({ coach: req.user.id })
        .populate('module', 'title description')
        .populate('student', 'name avatar')
        .populate('coach', 'name avatar')
        .sort({ updatedAt: -1 });
    }
    // If user is admin, return all projects
    else if (user.role === 'admin') {
      projects = await Project.find()
        .populate('module', 'title description')
        .populate('student', 'name avatar')
        .populate('coach', 'name avatar')
        .sort({ updatedAt: -1 });
    }
    
    res.json({
      success: true,
      data: projects
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      success: false,
      message: 'Server Fehler'
    });
  }
});

// @route   GET api/projects/:id
// @desc    Get project by ID
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)
      .populate('module', 'title description content resources tasks')
      .populate('student', 'name avatar')
      .populate('coach', 'name avatar');
    
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Projekt nicht gefunden'
      });
    }

    // Check if user is authorized to view this project
    const user = await User.findById(req.user.id);
    
    if (user.role === 'student' && project.student.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Zugriff verweigert'
      });
    }
    
    if (user.role === 'coach' && project.coach && project.coach.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Zugriff verweigert'
      });
    }

    res.json({
      success: true,
      data: project
    });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({
        success: false,
        message: 'Projekt nicht gefunden'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server Fehler'
    });
  }
});

// @route   POST api/projects
// @desc    Create a project
// @access  Private/Student
router.post('/', [
  auth,
  check('module', 'Modul-ID ist erforderlich').not().isEmpty(),
  check('title', 'Titel ist erforderlich').not().isEmpty(),
  check('description', 'Beschreibung ist erforderlich').not().isEmpty()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array()
    });
  }

  try {
    // Check if user is student
    const user = await User.findById(req.user.id);
    if (user.role !== 'student') {
      return res.status(403).json({
        success: false,
        message: 'Nur Schüler können Projekte erstellen'
      });
    }

    // Check if module exists
    const module = await Module.findById(req.body.module);
    if (!module) {
      return res.status(404).json({
        success: false,
        message: 'Modul nicht gefunden'
      });
    }

    const { title, description, submissionContent, submissionFiles } = req.body;

    // Create new project
    const newProject = new Project({
      title,
      description,
      module: req.body.module,
      student: req.user.id,
      submissionContent,
      submissionFiles: submissionFiles || []
    });

    const project = await newProject.save();

    res.json({
      success: true,
      data: project
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      success: false,
      message: 'Server Fehler'
    });
  }
});

// @route   PUT api/projects/:id
// @desc    Update a project
// @access  Private
router.put('/:id', [
  auth,
  check('title', 'Titel ist erforderlich').optional().not().isEmpty(),
  check('description', 'Beschreibung ist erforderlich').optional().not().isEmpty()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array()
    });
  }

  try {
    let project = await Project.findById(req.params.id);
    
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Projekt nicht gefunden'
      });
    }

    // Check if user is authorized to update this project
    const user = await User.findById(req.user.id);
    
    // Students can only update their own projects and only if not yet submitted
    if (user.role === 'student') {
      if (project.student.toString() !== req.user.id) {
        return res.status(403).json({
          success: false,
          message: 'Zugriff verweigert'
        });
      }
      
      if (project.status !== 'draft') {
        return res.status(403).json({
          success: false,
          message: 'Projekt kann nach Einreichung nicht mehr bearbeitet werden'
        });
      }
    }
    
    // Coaches can only update projects they are assigned to
    if (user.role === 'coach') {
      if (!project.coach || project.coach.toString() !== req.user.id) {
        return res.status(403).json({
          success: false,
          message: 'Zugriff verweigert'
        });
      }
    }

    const { 
      title, 
      description, 
      status, 
      submissionContent, 
      submissionFiles,
      feedback
    } = req.body;

    // Update fields
    if (title) project.title = title;
    if (description) project.description = description;
    
    // Students can update submission content and files
    if (user.role === 'student') {
      if (submissionContent) project.submissionContent = submissionContent;
      if (submissionFiles) project.submissionFiles = submissionFiles;
      
      // Students can submit their project
      if (status === 'submitted' && project.status === 'draft') {
        project.status = 'submitted';
        project.submittedAt = Date.now();
      }
    }
    
    // Coaches can update status and provide feedback
    if (user.role === 'coach' || user.role === 'admin') {
      if (status) project.status = status;
      
      if (feedback) {
        project.feedback = {
          content: feedback.content,
          givenBy: req.user.id,
          givenAt: Date.now(),
          rating: feedback.rating
        };
      }
      
      // Assign coach if not already assigned
      if (!project.coach) {
        project.coach = req.user.id;
      }
    }

    await project.save();

    res.json({
      success: true,
      data: project
    });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({
        success: false,
        message: 'Projekt nicht gefunden'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server Fehler'
    });
  }
});

// @route   DELETE api/projects/:id
// @desc    Delete a project
// @access  Private/Admin or Student (own draft projects)
router.delete('/:id', auth, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Projekt nicht gefunden'
      });
    }

    // Check if user is authorized to delete this project
    const user = await User.findById(req.user.id);
    
    // Students can only delete their own draft projects
    if (user.role === 'student') {
      if (project.student.toString() !== req.user.id) {
        return res.status(403).json({
          success: false,
          message: 'Zugriff verweigert'
        });
      }
      
      if (project.status !== 'draft') {
        return res.status(403).json({
          success: false,
          message: 'Nur Entwürfe können gelöscht werden'
        });
      }
    }
    // Only admins can delete non-draft projects
    else if (user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Zugriff verweigert'
      });
    }

    await project.remove();

    res.json({
      success: true,
      message: 'Projekt gelöscht'
    });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({
        success: false,
        message: 'Projekt nicht gefunden'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server Fehler'
    });
  }
});

module.exports = router;
