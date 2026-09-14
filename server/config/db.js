import mongoose from 'mongoose';

// Global variable to cache the connection for serverless environments
let cachedConnection = null;

const connectDB = async () => {
  // Diagnostic logging (only logs first 20 chars - safe to expose)
  const uriPrefix = process.env.MONGODB_URI ? process.env.MONGODB_URI.substring(0, 20) : 'NOT SET';
  console.log(`🔍 MongoDB URI prefix: "${uriPrefix}..."`);
  console.log(`🔍 URI length: ${process.env.MONGODB_URI ? process.env.MONGODB_URI.length : 0} characters`);
  
  if (!process.env.MONGODB_URI) {
    throw new Error('MONGODB_URI environment variable is not set');
  }

  // If we already have a cached connection, reuse it (important for serverless)
  if (cachedConnection && mongoose.connection.readyState === 1) {
    console.log('✓ Using cached MongoDB connection');
    return cachedConnection;
  }

  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      // Optimize for serverless
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });

    console.log(`✓ MongoDB Connected: ${conn.connection.host}`);
    
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
    console.error(`❌ MongoDB connection failed: ${error.message}`);
    if (error.name === 'MongoParseError') {
      console.error('❌ MONGODB_URI is malformed. Check for:');
      console.error('   - Missing mongodb:// or mongodb+srv:// prefix');
      console.error('   - Extra quotes around the URI');
      console.error('   - Spaces or newlines in the URI');
      console.error('   - Special characters in password (need URL encoding)');
    }
    cachedConnection = null;
    
    // NEVER call process.exit() in serverless - just throw the error
    // Let the request handler catch it and return appropriate error response
    throw error;
  }
};

export default connectDB;
