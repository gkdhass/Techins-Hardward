import mongoose from 'mongoose';
import slugify from 'slugify';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a product name'],
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
  images: [{
    type: String
  }],
  description: {
    type: String,
    required: [true, 'Please provide a description']
  },
  category: {
    type: String,
    required: true,
    enum: [
      'Development Boards',
      'Sensors',
      'Modules',
      'Kits',
      'PCBs',
      'Tools',
      'Connectors',
      'Electronic Components',
      'Accessories'
    ]
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  specifications: [{
    key: String,
    value: String
  }],
  availability: {
    type: String,
    enum: ['In Stock', 'Out of Stock', 'Pre-order'],
    default: 'In Stock'
  },
  stock: {
    type: Number,
    default: 0
  },
  purchaseUrl: {
    type: String,
    default: ''
  },
  external: {
    type: Boolean,
    default: false
  },
  featured: {
    type: Boolean,
    default: false
  },
  rating: {
    type: Number,
    default: 0
  },
  reviews: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Auto-generate slug
productSchema.pre('save', function(next) {
  if (!this.slug || this.isModified('name')) {
    this.slug = slugify(this.name, { lower: true, strict: true });
  }
  next();
});

productSchema.index({ category: 1 });
productSchema.index({ featured: 1 });
productSchema.index({ name: 'text', description: 'text' });

const Product = mongoose.model('Product', productSchema);

export default Product;
