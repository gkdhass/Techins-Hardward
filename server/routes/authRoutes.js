import express from 'express';
import {
  register,
  login,
  logout,
  getMe,
  updateProfile,
  updatePassword,
  forgotPassword,
  resetPassword
} from '../controllers/authController.js';
import { protect } from '../middleware/auth.js';
import { upload, handleUploadError } from '../middleware/upload.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/me', protect, getMe);
router.put('/profile', protect, upload.single('avatar'), handleUploadError, updateProfile);
router.put('/update-password', protect, updatePassword);
router.post('/forgot-password', forgotPassword);
router.put('/reset-password/:resettoken', resetPassword);

export default router;
