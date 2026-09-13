import mongoose from 'mongoose';
import slugify from 'slugify';

const componentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a component name'],
    trim: true
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true
  },
  image: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    required: [true, 'Please provide a description']
  },
  category: {
    type: String,
    required: true,
    enum: [
      'Microcontrollers',
      'Sensors',
      'Displays',
      'Motors',
      'Modules',
      'Communication',
      'Power',
      'Connectors',
      'ICs',
      'Development Boards'
    ]
  },
  manufacturer: {
    type: String,
    default: ''
  },
  voltage: {
    type: String,
    default: ''
  },
  interface: {
    type: String,
    default: ''
  },
  package: {
    type: String,
    default: ''
  },
  specifications: [{
    key: String,
    value: String
  }],
  datasheetUrl: {
    type: String,
    default: ''
  },
  purchaseUrl: {
    type: String,
    default: ''
  },
  availability: {
    type: String,
    enum: ['In Stock', 'Out of Stock', 'Limited', 'Discontinued'],
    default: 'In Stock'
  },
  relatedProjects: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project'
  }],
  views: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Auto-generate slug
componentSchema.pre('save', function(next) {
  if (!this.slug || this.isModified('name')) {
    this.slug = slugify(this.name, { lower: true, strict: true });
  }
  next();
});

componentSchema.index({ slug: 1 });
componentSchema.index({ category: 1 });
componentSchema.index({ manufacturer: 1 });
componentSchema.index({ name: 'text', description: 'text' });

const Component = mongoose.model('Component', componentSchema);

export default Component;
