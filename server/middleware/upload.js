import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Create subdirectories
const subDirs = ['profiles', 'courses', 'projects', 'events', 'articles', 'components', 'products'];
subDirs.forEach(dir => {
  const dirPath = path.join(uploadsDir, dir);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
});

// Storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let folder = 'uploads/';
    
    // Determine folder based on fieldname or path
    if (req.path.includes('/profile')) {
      folder += 'profiles/';
    } else if (req.path.includes('/courses')) {
      folder += 'courses/';
    } else if (req.path.includes('/projects')) {
      folder += 'projects/';
    } else if (req.path.includes('/events')) {
      folder += 'events/';
    } else if (req.path.includes('/articles')) {
      folder += 'articles/';
    } else if (req.path.includes('/components')) {
      folder += 'components/';
    } else if (req.path.includes('/products')) {
      folder += 'products/';
    }
    
    const uploadPath = path.join(__dirname, '..', folder);
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    const name = path.basename(file.originalname, ext).replace(/\s+/g, '-');
    cb(null, name + '-' + uniqueSuffix + ext);
  }
});

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
