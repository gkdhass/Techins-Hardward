import mongoose from 'mongoose';
import slugify from 'slugify';

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a project title'],
    trim: true
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true
  },
  description: {
    type: String,
    required: [true, 'Please provide a description']
  },
  images: [{
    type: String
  }],
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  technologies: [{
    type: String
  }],
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  difficulty: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced'],
    default: 'Beginner'
  },
  components: [{
    type: String
  }],
  githubUrl: {
    type: String,
    default: ''
  },
  documentationUrl: {
    type: String,
    default: ''
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  likesCount: {
    type: Number,
    default: 0
  },
  views: {
    type: Number,
    default: 0
  },
  featured: {
    type: Boolean,
    default: false
  },
  published: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for comments
projectSchema.virtual('comments', {
  ref: 'Comment',
  localField: '_id',
  foreignField: 'project'
});

// Auto-generate slug
projectSchema.pre('save', function(next) {
  if (!this.slug || this.isModified('title')) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  this.likesCount = this.likes.length;
  next();
});

projectSchema.index({ author: 1 });
projectSchema.index({ category: 1 });
projectSchema.index({ featured: 1 });
projectSchema.index({ title: 'text', description: 'text' });

const Project = mongoose.model('Project', projectSchema);

export default Project;
