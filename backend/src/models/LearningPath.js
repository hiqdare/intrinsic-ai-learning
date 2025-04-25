const mongoose = require('mongoose');

const LearningPathSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: [
      'Business & Entrepreneurship',
      'Environmental Sustainability',
      'Digital Identity & Privacy',
      'Society/Ethics/Inclusion',
      'Digitalization & Innovation',
      'Financial Literacy'
    ]
  },
  difficulty: {
    type: String,
    required: true,
    enum: ['Beginner', 'Intermediate', 'Advanced']
  },
  estimatedHours: {
    type: Number,
    required: true
  },
  modules: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Module'
  }],
  skills: [{
    name: String,
    level: {
      type: Number,
      min: 1,
      max: 5
    }
  }],
  prerequisites: [{
    type: String
  }],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  isActive: {
    type: Boolean,
    default: true
  }
});

// Update the updatedAt field before saving
LearningPathSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('LearningPath', LearningPathSchema);
