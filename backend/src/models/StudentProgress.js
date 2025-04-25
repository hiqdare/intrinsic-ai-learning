const mongoose = require('mongoose');

const StudentProgressSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  learningPath: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'LearningPath',
    required: true
  },
  modules: [{
    module: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Module',
      required: true
    },
    status: {
      type: String,
      enum: ['not_started', 'in_progress', 'completed'],
      default: 'not_started'
    },
    progress: {
      type: Number,
      min: 0,
      max: 100,
      default: 0
    },
    startedAt: Date,
    completedAt: Date,
    timeSpent: {
      type: Number, // in minutes
      default: 0
    }
  }],
  overallProgress: {
    type: Number,
    min: 0,
    max: 100,
    default: 0
  },
  startedAt: {
    type: Date,
    default: Date.now
  },
  lastActivityAt: {
    type: Date,
    default: Date.now
  },
  completedAt: Date,
  coachNotes: [{
    content: String,
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }]
});

// Update the lastActivityAt field before saving
StudentProgressSchema.pre('save', function(next) {
  this.lastActivityAt = Date.now();
  
  // Calculate overall progress based on module progress
  if (this.modules && this.modules.length > 0) {
    const totalModules = this.modules.length;
    const completedModules = this.modules.filter(m => m.status === 'completed').length;
    const inProgressModules = this.modules.filter(m => m.status === 'in_progress');
    
    let progressSum = completedModules * 100;
    inProgressModules.forEach(m => {
      progressSum += m.progress;
    });
    
    this.overallProgress = Math.round(progressSum / totalModules);
    
    // Set completedAt if all modules are completed
    if (completedModules === totalModules && !this.completedAt) {
      this.completedAt = Date.now();
    }
  }
  
  next();
});

module.exports = mongoose.model('StudentProgress', StudentProgressSchema);
