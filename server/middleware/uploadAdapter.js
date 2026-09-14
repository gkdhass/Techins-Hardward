// Upload adapter - uses Cloudinary in production (Vercel) and memory storage in development
// Controllers must handle buffer-to-Cloudinary upload in all environments
import { upload as localUpload, handleUploadError as localHandleError } from './upload.js';
import { upload as cloudinaryUpload, handleUploadError as cloudinaryHandleError } from './uploadCloudinary.js';

// Determine which upload strategy to use based on environment
// In production/Vercel: ALWAYS use Cloudinary (filesystem is read-only)
// In development: Use Cloudinary if configured, otherwise memory storage
const isProduction = process.env.NODE_ENV === 'production' || process.env.VERCEL;
const hasCloudinaryConfig = process.env.CLOUDINARY_CLOUD_NAME && 
                           process.env.CLOUDINARY_API_KEY && 
                           process.env.CLOUDINARY_API_SECRET;

// Export the appropriate upload middleware
export const upload = (isProduction || hasCloudinaryConfig) ? cloudinaryUpload : localUpload;
export const handleUploadError = (isProduction || hasCloudinaryConfig) ? cloudinaryHandleError : localHandleError;

const uploadType = (isProduction || hasCloudinaryConfig) ? 'Cloudinary' : 'Memory';
console.log(`🔧 Using ${uploadType} storage for file uploads (NODE_ENV=${process.env.NODE_ENV}, VERCEL=${!!process.env.VERCEL})`);
