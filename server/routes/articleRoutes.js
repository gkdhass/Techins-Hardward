import express from 'express';
import {
  getArticles,
  getArticle,
  createArticle,
  updateArticle,
  deleteArticle
} from '../controllers/articleController.js';
import { protect, authorize } from '../middleware/auth.js';
import { upload, handleUploadError } from '../middleware/upload.js';

const router = express.Router();

router.get('/', getArticles);
router.get('/:slug', getArticle);
router.post('/', protect, authorize('instructor', 'admin'), upload.single('thumbnail'), handleUploadError, createArticle);
router.put('/:id', protect, authorize('instructor', 'admin'), upload.single('thumbnail'), handleUploadError, updateArticle);
router.delete('/:id', protect, authorize('instructor', 'admin'), deleteArticle);

export default router;
