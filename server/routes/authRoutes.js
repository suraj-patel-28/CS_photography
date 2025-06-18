const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const { protect } = require('../middleware/auth');

// Get admin credentials from environment
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH;

// JWT configuration
const JWT_SECRET = process.env.JWT_SECRET || require('crypto').randomBytes(64).toString('hex');
const JWT_EXPIRE = process.env.JWT_EXPIRE || '7d';

// Rate limiting for login attempts
const loginAttempts = new Map();

// @desc    Admin login
// @route   POST /api/auth/login
// @access  Public
router.post('/login', [
  body('email').isEmail().normalizeEmail(),
  body('password').notEmpty().trim()
], async (req, res) => {
  try {
    // Validate input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Invalid input',
        errors: errors.array()
      });
    }

    const { email, password } = req.body;
    const ipAddress = req.ip;

    // Check rate limiting (5 attempts per hour)
    const attempts = loginAttempts.get(ipAddress) || { count: 0, lastAttempt: Date.now() };
    const hourAgo = Date.now() - (60 * 60 * 1000);
    
    if (attempts.lastAttempt > hourAgo && attempts.count >= 5) {
      return res.status(429).json({
        success: false,
        message: 'Too many login attempts. Please try again later.'
      });
    }

    // Verify credentials
    if (!ADMIN_EMAIL || !ADMIN_PASSWORD_HASH) {
      console.error('Admin credentials not configured');
      return res.status(500).json({
        success: false,
        message: 'Server configuration error'
      });
    }

    // Check email
    if (email !== ADMIN_EMAIL) {
      // Update failed attempts
      loginAttempts.set(ipAddress, {
        count: attempts.count + 1,
        lastAttempt: Date.now()
      });
      
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, ADMIN_PASSWORD_HASH);
    if (!isMatch) {
      // Update failed attempts
      loginAttempts.set(ipAddress, {
        count: attempts.count + 1,
        lastAttempt: Date.now()
      });
      
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Clear failed attempts on successful login
    loginAttempts.delete(ipAddress);

    // Create token with additional security claims
    const token = jwt.sign(
      { 
        email: ADMIN_EMAIL,
        role: 'admin',
        iat: Math.floor(Date.now() / 1000),
        jti: require('crypto').randomBytes(16).toString('hex') // JWT ID for revocation
      },
      JWT_SECRET,
      { 
        expiresIn: JWT_EXPIRE,
        issuer: 'cs-photography',
        audience: 'admin-panel'
      }
    );

    // Set secure cookie (if using cookies)
    res.cookie('adminToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    res.json({
      success: true,
      token,
      user: {
        email: ADMIN_EMAIL,
        role: 'admin'
      },
      expiresIn: JWT_EXPIRE
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Authentication failed'
    });
  }
});

// @desc    Verify token
// @route   GET /api/auth/verify
// @access  Private
router.get('/verify', protect, (req, res) => {
  res.json({
    success: true,
    user: req.user,
    message: 'Token is valid'
  });
});

// @desc    Logout
// @route   POST /api/auth/logout
// @access  Private
router.post('/logout', protect, (req, res) => {
  // Clear cookie if using cookies
  res.clearCookie('adminToken');
  
  // In a real app, you might want to blacklist the token
  res.json({
    success: true,
    message: 'Logged out successfully'
  });
});

// @desc    Change password
// @route   POST /api/auth/change-password
// @access  Private
router.post('/change-password', protect, [
  body('currentPassword').notEmpty(),
  body('newPassword').isLength({ min: 8 }).withMessage('Password must be at least 8 characters')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Invalid input',
        errors: errors.array()
      });
    }

    const { currentPassword, newPassword } = req.body;

    // Verify current password
    const isMatch = await bcrypt.compare(currentPassword, ADMIN_PASSWORD_HASH);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Current password is incorrect'
      });
    }

    // Generate new hash
    const salt = await bcrypt.genSalt(10);
    const newHash = await bcrypt.hash(newPassword, salt);

    res.json({
      success: true,
      hash: newHash,
      message: 'Password changed. Update ADMIN_PASSWORD_HASH in your .env file with the new hash.'
    });
  } catch (error) {
    console.error('Password change error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to change password'
    });
  }
});

// Clean up old login attempts periodically
setInterval(() => {
  const hourAgo = Date.now() - (60 * 60 * 1000);
  for (const [ip, attempts] of loginAttempts.entries()) {
    if (attempts.lastAttempt < hourAgo) {
      loginAttempts.delete(ip);
    }
  }
}, 60 * 60 * 1000); // Run every hour

module.exports = router;