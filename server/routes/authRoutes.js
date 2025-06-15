const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Simple admin credentials (in production, store in database)
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@csphotography.com';
const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH || '$2a$10$XQq9hC7kUL5hSkdRw4J5OuVZdRzJqHSpFY8xhVYYkqF.nPrMQqB0G'; // Default: "admin123"

// @desc    Admin login
// @route   POST /api/auth/login
// @access  Public
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Debug log (remove in production)
    console.log('Login attempt:', { email });
    console.log('Expected email:', ADMIN_EMAIL);
    console.log('Password hash exists:', !!ADMIN_PASSWORD_HASH);

    // Check email
    if (email !== ADMIN_EMAIL) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, ADMIN_PASSWORD_HASH);
    console.log('Password match:', isMatch);
    
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Create token
    const token = jwt.sign(
      { email: ADMIN_EMAIL },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '30d' }
    );

    res.json({
      success: true,
      token,
      user: {
        email: ADMIN_EMAIL,
        role: 'admin'
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @desc    Generate password hash (helper endpoint)
// @route   POST /api/auth/hash
// @access  Public (remove in production)
router.post('/hash', async (req, res) => {
  try {
    const { password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    
    res.json({
      success: true,
      hash,
      message: 'Add this hash to your .env as ADMIN_PASSWORD_HASH'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error generating hash'
    });
  }
});

module.exports = router;