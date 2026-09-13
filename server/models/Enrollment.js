import mongoose from 'mongoose';

const enrollmentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  enrolledAt: {
    type: Date,
    default: Date.now
  },
  progress: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },
  completedLessons: [{
    lesson: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Lesson'
    },
    completedAt: Date
  }],
  completed: {
    type: Boolean,
    default: false
  },
  completedAt: {
    type: Date
  },
  lastAccessedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Compound index to prevent duplicate enrollments
enrollmentSchema.index({ user: 1, course: 1 }, { unique: true });
enrollmentSchema.index({ user: 1 });
enrollmentSchema.index({ course: 1 });

const Enrollment = mongoose.model('Enrollment', enrollmentSchema);

export default Enrollment;
