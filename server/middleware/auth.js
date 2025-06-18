const jwt = require('jsonwebtoken');

// Token blacklist (in production, use Redis or database)
const tokenBlacklist = new Set();

exports.protect = async (req, res, next) => {
  try {
    let token;

    // Check for token in multiple places
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies && req.cookies.adminToken) {
      token = req.cookies.adminToken;
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized - No token provided'
      });
    }

    // Check if token is blacklisted
    if (tokenBlacklist.has(token)) {
      return res.status(401).json({
        success: false,
        message: 'Token has been revoked'
      });
    }

    try {
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET, {
        issuer: 'cs-photography',
        audience: 'admin-panel'
      });

      // Check if token is expired
      if (decoded.exp && Date.now() >= decoded.exp * 1000) {
        return res.status(401).json({
          success: false,
          message: 'Token has expired'
        });
      }

      // Add user to request
      req.user = {
        email: decoded.email,
        role: decoded.role,
        tokenId: decoded.jti
      };
      req.token = token;

      next();
    } catch (err) {
      console.error('Token verification error:', err.message);
      
      if (err.name === 'TokenExpiredError') {
        return res.status(401).json({
          success: false,
          message: 'Token has expired'
        });
      }
      
      if (err.name === 'JsonWebTokenError') {
        return res.status(401).json({
          success: false,
          message: 'Invalid token'
        });
      }
      
      return res.status(401).json({
        success: false,
        message: 'Not authorized'
      });
    }
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error in authentication'
    });
  }
};

// Function to blacklist a token
exports.revokeToken = (token) => {
  tokenBlacklist.add(token);
};

// Clean up expired tokens from blacklist periodically
setInterval(() => {
  for (const token of tokenBlacklist) {
    try {
      const decoded = jwt.decode(token);
      if (decoded && decoded.exp && Date.now() >= decoded.exp * 1000) {
        tokenBlacklist.delete(token);
      }
    } catch (err) {
      tokenBlacklist.delete(token);
    }
  }
}, 24 * 60 * 60 * 1000); // Run daily