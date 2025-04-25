import { Schema, model } from 'mongoose';
import { argon2id, hash, verify } from 'argon2';

const UserSchema = new Schema({
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
    type: Schema.Types.ObjectId,
    ref: 'LearningPath'
  }],
  completedModules: [{
    type: Schema.Types.ObjectId,
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
      // Argon2 configuration options
      const options = {
        type: argon2id, // Recommended type for general use
        memoryCost: 2**16,     // 64 MiB memory cost
        timeCost: 3,           // 3 iterations
        parallelism: 1         // 1 degree of parallelism
      };
      
      this.password = await hash(this.password, options);
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
    
    return await verify(this.password, candidatePassword);

  } catch (error) {
    throw error;
  }
};

export default model('User', UserSchema);
