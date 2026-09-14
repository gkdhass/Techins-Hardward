import mongoose from 'mongoose';
import slugify from 'slugify';

const documentationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title'],
    trim: true
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true
  },
  category: {
    type: String,
    required: true,
    enum: [
      'Getting Started',
      'Microcontrollers',
      'Sensors',
      'Communication',
      'Power',
      'PCB Design',
      'Programming',
      'Tools',
      'Advanced'
    ]
  },
  content: {
    type: String,
    required: [true, 'Please provide content']
  },
  order: {
    type: Number,
    default: 0
  },
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Documentation'
  },
  published: {
    type: Boolean,
    default: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

// Auto-generate slug
documentationSchema.pre('save', function(next) {
  if (!this.slug || this.isModified('title')) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  next();
});

documentationSchema.index({ category: 1, order: 1 });
documentationSchema.index({ parent: 1 });

const Documentation = mongoose.model('Documentation', documentationSchema);

export default Documentation;
