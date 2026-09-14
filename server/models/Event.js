import mongoose from 'mongoose';
import slugify from 'slugify';

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide an event title'],
    trim: true
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true
  },
  banner: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    required: [true, 'Please provide a description']
  },
  type: {
    type: String,
    enum: ['Hackathon', 'Makeathon', 'Workshop', 'Buildathon', 'Meetup', 'Conference'],
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date
  },
  location: {
    type: String,
    default: ''
  },
  online: {
    type: Boolean,
    default: false
  },
  registrationDeadline: {
    type: Date
  },
  registrationStatus: {
    type: String,
    enum: ['Open', 'Closed', 'Full'],
    default: 'Open'
  },
  prize: {
    type: String,
    default: ''
  },
  maxParticipants: {
    type: Number,
    default: 0
  },
  participants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  rules: {
    type: String,
    default: ''
  },
  timeline: [{
    title: String,
    description: String,
    date: Date
  }],
  judges: [{
    name: String,
    title: String,
    image: String,
    bio: String
  }],
  sponsors: [{
    name: String,
    logo: String,
    website: String,
    tier: String
  }],
  mentors: [{
    name: String,
    expertise: String,
    image: String,
    bio: String
  }],
  faqs: [{
    question: String,
    answer: String
  }],
  organizer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
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
  timestamps: true
});

// Auto-generate slug
eventSchema.pre('save', function(next) {
  if (!this.slug || this.isModified('title')) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  next();
});

eventSchema.index({ type: 1 });
eventSchema.index({ date: 1 });
eventSchema.index({ featured: 1 });
eventSchema.index({ title: 'text', description: 'text' });

const Event = mongoose.model('Event', eventSchema);

export default Event;
