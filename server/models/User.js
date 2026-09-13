import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name'],
    trim: true,
    maxlength: [50, 'Name cannot be more than 50 characters']
  },
  username: {
    type: String,
    unique: true,
    sparse: true,
    lowercase: true,
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email']
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: [6, 'Password must be at least 6 characters'],
    select: false
  },
  role: {
    type: String,
    enum: ['user', 'instructor', 'admin'],
    default: 'user'
  },
  avatar: {
    type: String,
    default: ''
  },
  bio: {
    type: String,
    maxlength: [500, 'Bio cannot be more than 500 characters']
  },
  skills: [{
    type: String
  }],
  github: String,
  linkedin: String,
  website: String,
  reputation: {
    type: Number,
    default: 0
  },
  badges: [{
    name: String,
    icon: String,
    earnedAt: Date
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  lastLogin: Date
}, {
  timestamps: true
});

// Create username from email if not provided
userSchema.pre('save', async function(next) {
  if (!this.username && this.email) {
    const baseUsername = this.email.split('@')[0].toLowerCase().replace(/[^a-z0-9]/g, '');
    let username = baseUsername;
    let counter = 1;
    
    while (await mongoose.model('User').findOne({ username })) {
      username = `${baseUsername}${counter}`;
      counter++;
    }
    
    this.username = username;
  }
  next();
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Compare password method
userSchema.methods.comparePassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Indexes
userSchema.index({ email: 1 });
userSchema.index({ username: 1 });
userSchema.index({ role: 1 });

const User = mongoose.model('User', userSchema);

export default User;
