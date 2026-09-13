import express from 'express';
import {
  getEvents,
  getEvent,
  createEvent,
  updateEvent,
  deleteEvent,
  registerForEvent
} from '../controllers/eventController.js';
import { protect, authorize, optionalAuth } from '../middleware/auth.js';
import { upload, handleUploadError } from '../middleware/upload.js';

const router = express.Router();

router.get('/', getEvents);
router.get('/:slug', optionalAuth, getEvent);
router.post('/', protect, authorize('admin'), upload.single('banner'), handleUploadError, createEvent);
router.put('/:id', protect, authorize('admin'), upload.single('banner'), handleUploadError, updateEvent);
router.delete('/:id', protect, authorize('admin'), deleteEvent);
router.post('/:id/register', protect, registerForEvent);

export default router;
