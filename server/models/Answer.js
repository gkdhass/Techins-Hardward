import mongoose from 'mongoose';

const answerSchema = new mongoose.Schema({
  question: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Question',
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  body: {
    type: String,
    required: [true, 'Please provide an answer']
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
  accepted: {
    type: Boolean,
    default: false
  },
  comments: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    text: String,
    createdAt: {
      type: Date,
      default: Date.now
    }
  }]
}, {
  timestamps: true
});

// Update votes count
answerSchema.pre('save', function(next) {
  this.votes = this.upvotes.length - this.downvotes.length;
  next();
});

answerSchema.index({ question: 1, createdAt: -1 });
answerSchema.index({ author: 1 });
answerSchema.index({ votes: -1 });

const Answer = mongoose.model('Answer', answerSchema);

export default Answer;
