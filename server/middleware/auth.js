import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// Protect routes - authentication required
export const protect = async (req, res, next) => {
  try {
    let token;

    // Check for token in Authorization header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }
    // Check for token in cookies
    else if (req.cookies.token) {
      token = req.cookies.token;
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to access this route',
        error: 'No token provided'
      });
    }

    try {
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // Get user from token
      req.user = await User.findById(decoded.id).select('-password');
      
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'User no longer exists',
          error: 'Invalid token'
        });
      }

      if (!req.user.isActive) {
        return res.status(401).json({
          success: false,
          message: 'Account has been deactivated',
          error: 'Account inactive'
        });
      }

      next();
    } catch (err) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to access this route',
        error: 'Token verification failed'
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Server error in authentication',
      error: error.message
    });
  }
};

// Authorize roles
export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `User role '${req.user.role}' is not authorized to access this route`,
        error: 'Insufficient permissions'
      });
    }
    next();
  };
};

// Optional auth - attaches user if token exists
export const optionalAuth = async (req, res, next) => {
  try {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies.token) {
      token = req.cookies.token;
    }

    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select('-password');
      } catch (err) {
        // Token invalid, but continue without user
      }
    }

    next();
  } catch (error) {
    next();
  }
};
