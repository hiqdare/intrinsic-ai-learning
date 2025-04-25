const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  module: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Module',
    required: true
  },
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  coach: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  status: {
    type: String,
    enum: ['draft', 'submitted', 'in_review', 'feedback_given', 'completed'],
    default: 'draft'
  },
  submissionContent: {
    type: String
  },
  submissionFiles: [{
    filename: String,
    path: String,
    uploadedAt: {
      type: Date,
      default: Date.now
    }
  }],
  feedback: {
    content: String,
    givenBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    givenAt: Date,
    rating: {
      type: Number,
      min: 1,
      max: 5
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  submittedAt: Date,
  completedAt: Date
});

// Update the updatedAt field before saving
ProjectSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  
  // Set submittedAt date when status changes to submitted
  if (this.isModified('status') && this.status === 'submitted' && !this.submittedAt) {
    this.submittedAt = Date.now();
  }
  
  // Set completedAt date when status changes to completed
  if (this.isModified('status') && this.status === 'completed' && !this.completedAt) {
    this.completedAt = Date.now();
  }
  
  next();
});

module.exports = mongoose.model('Project', ProjectSchema);
