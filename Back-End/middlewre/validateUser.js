import { body, validationResult } from 'express-validator';

export const validateUser = [
  body('userName')
    .notEmpty().withMessage('userName is required')
    .isLength({ min: 3 }).withMessage('userName must be at least 3 characters long'),

  body('email')
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please enter a valid email address'),

  body('password')
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),

  // 🔽 Custom middleware to handle the result
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array().map(err => (err.msg))});
    }
    next();
  }
  
];



