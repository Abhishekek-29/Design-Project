const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

// Middleware to verify token
const verifyToken = (roles) => (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    
    console.log('Authorization Header:', authHeader); // Debugging
    
    if (!authHeader) return res.status(403).json({ message: 'Token required' });

    const token = authHeader.split(' ')[1];

    console.log('Extracted Token:', token); // Debugging

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        console.error('JWT Verification Error:', err.message);
        return res.status(401).json({ message: 'Invalid token', error: err.message });
      }

      console.log('Decoded Token:', decoded); // Debugging

      if (!roles.includes(decoded.role)) {
        return res.status(403).json({ message: 'Access denied' });
      }

      req.user = decoded;
      next();
    });
  } catch (err) {
    console.error('Middleware Error:', err.message);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

module.exports = verifyToken;
