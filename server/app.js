import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from './config/db.js';
import errorHandler from './middleware/errorHandler.js';

// Import routes
import authRoutes from './routes/authRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import courseRoutes from './routes/courseRoutes.js';
import projectRoutes from './routes/projectRoutes.js';
import componentRoutes from './routes/componentRoutes.js';
import eventRoutes from './routes/eventRoutes.js';
import questionRoutes from './routes/questionRoutes.js';
import articleRoutes from './routes/articleRoutes.js';

// Load env vars
dotenv.config();

// ES module dirname workaround
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Connect to database (with caching for serverless)
connectDB();

// Initialize app
const app = express();

// Security middleware
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));

// CORS - restrict to CLIENT_URL in production
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true
}));

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cookie parser
app.use(cookieParser());

// Serve static files (only used in local development - Cloudinary in production)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Mount routes
app.use('/api/auth', authRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/components', componentRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/questions', questionRoutes);
app.use('/api/articles', articleRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'TECHINS HARDWARE API is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Error handler (must be last)
app.use(errorHandler);

// 404 handler - Only respond to /api/* paths, let Vercel handle frontend routes
app.use('/api', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'API route not found',
    path: req.path
  });
});

// Export app WITHOUT starting server
// Server startup is handled by local.js (development) or api/index.js (Vercel)
export default app;
