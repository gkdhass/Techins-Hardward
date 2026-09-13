import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import path from 'path';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Determine folder based on request path
const getFolder = (req) => {
  if (req.path.includes('/profile')) return 'techins/profiles';
  if (req.path.includes('/courses')) return 'techins/courses';
  if (req.path.includes('/projects')) return 'techins/projects';
  if (req.path.includes('/events')) return 'techins/events';
  if (req.path.includes('/articles')) return 'techins/articles';
  if (req.path.includes('/components')) return 'techins/components';
  if (req.path.includes('/products')) return 'techins/products';
  return 'techins/misc';
};

// Cloudinary storage configuration
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: (req, file) => {
    const folder = getFolder(req);
    const ext = path.extname(file.originalname).substring(1);
    const name = path.basename(file.originalname, path.extname(file.originalname))
      .replace(/\s+/g, '-');
    
    return {
      folder: folder,
      public_id: `${name}-${Date.now()}`,
      format: ext,
      allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'],
      transformation: [
        { width: 2000, height: 2000, crop: 'limit' }, // Max dimensions
        { quality: 'auto' }, // Auto quality
        { fetch_format: 'auto' } // Auto format (WebP when supported)
      ]
    };
  }
});

// File filter
const fileFilter = (req, file, cb) => {
  // Allowed types
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

// Multer upload configuration with Cloudinary
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

// Helper function to delete image from Cloudinary
export const deleteFromCloudinary = async (imageUrl) => {
  try {
    // Extract public_id from Cloudinary URL
    const urlParts = imageUrl.split('/');
    const filename = urlParts[urlParts.length - 1];
    const publicId = filename.split('.')[0];
    const folder = urlParts.slice(urlParts.indexOf('techins'), -1).join('/');
    const fullPublicId = `${folder}/${publicId}`;
    
    const result = await cloudinary.uploader.destroy(fullPublicId);
    return result;
  } catch (error) {
    console.error('Error deleting from Cloudinary:', error);
    throw error;
  }
};

export { cloudinary };
