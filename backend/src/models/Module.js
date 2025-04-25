const mongoose = require('mongoose');

const ModuleSchema = new mongoose.Schema({
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
  type: {
    type: String,
    required: true,
    enum: ['Project', 'Theory', 'Exercise', 'Discussion', 'Real-life Application']
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
  content: {
    type: String,
    required: true
  },
  resources: [{
    title: String,
    type: {
      type: String,
      enum: ['Video', 'Article', 'Book', 'Website', 'Tool', 'Other']
    },
    url: String,
    description: String
  }],
  tasks: [{
    title: String,
    description: String,
    isRequired: {
      type: Boolean,
      default: true
    }
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
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Module'
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
ModuleSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Module', ModuleSchema);
