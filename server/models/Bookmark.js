import mongoose from 'mongoose';

const bookmarkSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  resourceType: {
    type: String,
    required: true,
    enum: ['Project', 'Article', 'Course', 'Component', 'Documentation', 'Product']
  },
  resourceId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  }
}, {
  timestamps: true
});

// Compound index to prevent duplicate bookmarks
bookmarkSchema.index({ user: 1, resourceType: 1, resourceId: 1 }, { unique: true });

const Bookmark = mongoose.model('Bookmark', bookmarkSchema);

export default Bookmark;
