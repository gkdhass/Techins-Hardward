import { validationResult } from 'express-validator';

// Validation result middleware
export const validate = (req, res, next) => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    const extractedErrors = errors.array().map(err => ({
      field: err.path,
      message: err.msg
    }));
    
    return res.status(422).json({
      success: false,
      message: 'Validation failed',
      errors: extractedErrors
    });
  }
  
  next();
};
