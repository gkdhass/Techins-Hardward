// Upload adapter - uses Cloudinary in production (Vercel) and local storage in development
import { upload as localUpload, handleUploadError as localHandleError } from './upload.js';
import { upload as cloudinaryUpload, handleUploadError as cloudinaryHandleError } from './uploadCloudinary.js';

// Determine which upload strategy to use based on environment
const isProduction = process.env.NODE_ENV === 'production' || process.env.VERCEL;

// Export the appropriate upload middleware
export const upload = isProduction ? cloudinaryUpload : localUpload;
export const handleUploadError = isProduction ? cloudinaryHandleError : localHandleError;

console.log(`Using ${isProduction ? 'Cloudinary' : 'Local'} storage for file uploads`);
