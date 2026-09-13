import mongoose from 'mongoose';

// Global variable to cache the connection for serverless environments
let cachedConnection = null;

const connectDB = async () => {
  // If we already have a cached connection, reuse it (important for serverless)
  if (cachedConnection && mongoose.connection.readyState === 1) {
    console.log('Using cached MongoDB connection');
    return cachedConnection;
  }

  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      // Optimize for serverless
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
    
    // Cache the connection for reuse
    cachedConnection = conn;

    // Handle connection events
    mongoose.connection.on('error', (err) => {
      console.error(`MongoDB connection error: ${err}`);
      cachedConnection = null; // Clear cache on error
    });

    mongoose.connection.on('disconnected', () => {
      console.log('MongoDB disconnected');
      cachedConnection = null; // Clear cache on disconnect
    });

    return conn;

  } catch (error) {
    console.error(`Error: ${error.message}`);
    cachedConnection = null;
    
    // In serverless, don't exit process - just throw error
    if (process.env.VERCEL) {
      throw error;
    }
    process.exit(1);
  }
};

export default connectDB;
