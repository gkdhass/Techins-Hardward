import express from 'express';
import {
  getComponents,
  getComponent,
  createComponent,
  updateComponent,
  deleteComponent,
  getComponentCategories
} from '../controllers/componentController.js';
import { protect, authorize } from '../middleware/auth.js';
import { upload, handleUploadError } from '../middleware/upload.js';

const router = express.Router();

router.get('/', getComponents);
router.get('/meta/categories', getComponentCategories);
router.get('/:slug', getComponent);
router.post('/', protect, authorize('admin'), upload.single('image'), handleUploadError, createComponent);
router.put('/:id', protect, authorize('admin'), upload.single('image'), handleUploadError, updateComponent);
router.delete('/:id', protect, authorize('admin'), deleteComponent);

export default router;
