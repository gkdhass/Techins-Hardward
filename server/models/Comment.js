import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project'
  },
  article: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Article'
  },
  content: {
    type: String,
    required: [true, 'Please provide a comment'],
    trim: true,
    maxlength: [1000, 'Comment cannot be more than 1000 characters']
  },
  parentComment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment'
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  edited: {
    type: Boolean,
    default: false
  },
  editedAt: Date
}, {
  timestamps: true
});

commentSchema.index({ project: 1, createdAt: -1 });
commentSchema.index({ article: 1, createdAt: -1 });
commentSchema.index({ user: 1 });

const Comment = mongoose.model('Comment', commentSchema);

export default Comment;
