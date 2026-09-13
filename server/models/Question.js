import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a question title'],
    trim: true
  },
  body: {
    type: String,
    required: [true, 'Please provide question details']
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  tags: [{
    type: String,
    trim: true
  }],
  views: {
    type: Number,
    default: 0
  },
  votes: {
    type: Number,
    default: 0
  },
  upvotes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  downvotes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  acceptedAnswer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Answer'
  },
  answerCount: {
    type: Number,
    default: 0
  },
  solved: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for answers
questionSchema.virtual('answers', {
  ref: 'Answer',
  localField: '_id',
  foreignField: 'question'
});

// Update votes count
questionSchema.pre('save', function(next) {
  this.votes = this.upvotes.length - this.downvotes.length;
  next();
});

questionSchema.index({ author: 1 });
questionSchema.index({ tags: 1 });
questionSchema.index({ createdAt: -1 });
questionSchema.index({ votes: -1 });
questionSchema.index({ title: 'text', body: 'text' });

const Question = mongoose.model('Question', questionSchema);

export default Question;
