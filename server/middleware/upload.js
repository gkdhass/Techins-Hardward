import multer from 'multer';
import path from 'path';

// Use memory storage instead of disk storage
// Files will be stored in memory as Buffer objects
// This is safe for Vercel's read-only filesystem
const storage = multer.memoryStorage();

// File filter
const fileFilter = (req, file, cb) => {
  // Allowed ext
  const allowedTypes = /jpeg|jpg|png|gif|webp|svg/;
  
  // Check ext
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  
  // Check mime
  const mimetype = allowedTypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error('Only image files are allowed (jpeg, jpg, png, gif, webp, svg)'));
  }
};

// Multer upload configuration
export const upload = multer({
  storage: storage,
  limits: {
    fileSize: parseInt(process.env.MAX_FILE_SIZE) || 5 * 1024 * 1024 // 5MB default
  },
  fileFilter: fileFilter
});

// Handle upload errors
export const handleUploadError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        success: false,
        message: 'File size is too large. Maximum size is 5MB',
        error: err.message
      });
    }
    return res.status(400).json({
      success: false,
      message: 'File upload error',
      error: err.message
    });
  } else if (err) {
    return res.status(400).json({
      success: false,
      message: err.message,
      error: err.message
    });
  }
  next();
};
