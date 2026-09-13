import mongoose from 'mongoose';

const lessonSchema = new mongoose.Schema({
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  title: {
    type: String,
    required: [true, 'Please provide a lesson title'],
    trim: true
  },
  description: {
    type: String,
    default: ''
  },
  videoUrl: {
    type: String,
    default: ''
  },
  content: {
    type: String,
    default: ''
  },
  duration: {
    type: String,
    default: '0m'
  },
  order: {
    type: Number,
    required: true
  },
  resources: [{
    title: String,
    url: String,
    type: String
  }],
  published: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

lessonSchema.index({ course: 1, order: 1 });

const Lesson = mongoose.model('Lesson', lessonSchema);

export default Lesson;
