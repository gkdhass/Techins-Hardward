import mongoose from 'mongoose';
import slugify from 'slugify';

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide an article title'],
    trim: true
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true
  },
  thumbnail: {
    type: String,
    default: ''
  },
  content: {
    type: String,
    required: [true, 'Please provide article content']
  },
  excerpt: {
    type: String,
    default: ''
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: [
      'Electronics',
      'Embedded',
      'IoT',
      'PCB',
      'Robotics',
      'Arduino',
      'ESP32',
      'Raspberry Pi',
      'Hardware Design',
      'Tutorial',
      'News'
    ]
  },
  tags: [{
    type: String
  }],
  readingTime: {
    type: String,
    default: '5 min read'
  },
  published: {
    type: Boolean,
    default: false
  },
  views: {
    type: Number,
    default: 0
  },
  featured: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Auto-generate slug and excerpt
articleSchema.pre('save', function(next) {
  if (!this.slug || this.isModified('title')) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  
  if (!this.excerpt && this.content) {
    this.excerpt = this.content.substring(0, 200) + '...';
  }
  
  // Calculate reading time (average 200 words per minute)
  if (this.content) {
    const wordCount = this.content.split(/\s+/).length;
    const minutes = Math.ceil(wordCount / 200);
    this.readingTime = `${minutes} min read`;
  }
  
  next();
});

articleSchema.index({ author: 1 });
articleSchema.index({ category: 1 });
articleSchema.index({ published: 1 });
articleSchema.index({ featured: 1 });
articleSchema.index({ title: 'text', content: 'text' });

const Article = mongoose.model('Article', articleSchema);

export default Article;
