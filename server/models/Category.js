import mongoose from 'mongoose';
import slugify from 'slugify';

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a category name'],
    unique: true,
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
  icon: {
    type: String,
    default: 'Cpu'
  },
  image: {
    type: String,
    default: ''
  },
  resourcesCount: {
    type: Number,
    default: 0
  },
  projectCount: {
    type: Number,
    default: 0
  },
  order: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Auto-generate slug from name
categorySchema.pre('save', function(next) {
  if (!this.slug || this.isModified('name')) {
    this.slug = slugify(this.name, { lower: true, strict: true });
  }
  next();
});

categorySchema.index({ slug: 1 });
categorySchema.index({ name: 1 });

const Category = mongoose.model('Category', categorySchema);

export default Category;
