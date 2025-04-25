const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Bitte geben Sie eine gültige E-Mail-Adresse ein']
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  role: {
    type: String,
    enum: ['student', 'coach', 'admin'],
    default: 'student'
  },
  avatar: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  lastActivity: {
    type: Date,
    default: Date.now
  },
  skills: [{
    name: String,
    level: {
      type: Number,
      min: 1,
      max: 5
    }
  }],
  interests: [String],
  learningPaths: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'LearningPath'
  }],
  completedModules: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Module'
  }]
});

// Hash password before saving
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }
  
  try {
    // Only hash the password if it doesn't start with 'google-oauth-'
    if (!this.password.startsWith('google-oauth-')) {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
    }
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare passwords
UserSchema.methods.comparePassword = async function(candidatePassword) {
  try {
    // If it's a Google OAuth user, don't compare passwords
    if (this.password.startsWith('google-oauth-')) {
      return false;
    }
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    throw error;
  }
};

module.exports = mongoose.model('User', UserSchema);
