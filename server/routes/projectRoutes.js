import express from 'express';
import {
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
  likeProject,
  addComment,
  getMyProjects
} from '../controllers/projectController.js';
import { protect, optionalAuth } from '../middleware/auth.js';
import { upload, handleUploadError } from '../middleware/upload.js';

const router = express.Router();

router.get('/', getProjects);
router.get('/my-projects', protect, getMyProjects);
router.get('/:slug', optionalAuth, getProject);
router.post('/', protect, upload.array('images', 5), handleUploadError, createProject);
router.put('/:id', protect, upload.array('images', 5), handleUploadError, updateProject);
router.delete('/:id', protect, deleteProject);
router.post('/:id/like', protect, likeProject);
router.post('/:id/comments', protect, addComment);

export default router;
