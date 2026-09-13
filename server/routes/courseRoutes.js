import express from 'express';
import {
  getCourses,
  getCourse,
  createCourse,
  updateCourse,
  deleteCourse,
  enrollInCourse,
  getMyLearning,
  completeLesson
} from '../controllers/courseController.js';
import { protect, authorize, optionalAuth } from '../middleware/auth.js';
import { upload, handleUploadError } from '../middleware/upload.js';

const router = express.Router();

router.get('/', getCourses);
router.get('/my-learning', protect, getMyLearning);
router.get('/:slug', optionalAuth, getCourse);
router.post('/', protect, authorize('instructor', 'admin'), upload.single('thumbnail'), handleUploadError, createCourse);
router.put('/:id', protect, authorize('instructor', 'admin'), upload.single('thumbnail'), handleUploadError, updateCourse);
router.delete('/:id', protect, authorize('instructor', 'admin'), deleteCourse);
router.post('/:id/enroll', protect, enrollInCourse);
router.post('/:courseId/lessons/:lessonId/complete', protect, completeLesson);

export default router;
