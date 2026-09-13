// Local development server - imports app.js and starts HTTP server
import app from './app.js';

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`🚀 Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
  console.log(`📍 Local: http://localhost:${PORT}`);
  console.log(`🏥 Health check: http://localhost:${PORT}/api/health`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.log(`❌ Error: ${err.message}`);
  server.close(() => process.exit(1));
});

// Handle SIGTERM
process.on('SIGTERM', () => {
  console.log('👋 SIGTERM received, closing server...');
  server.close(() => {
    console.log('✅ Server closed');
    process.exit(0);
  });
});
