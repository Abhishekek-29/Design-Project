const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware'); // Ensure the path is correct

// Example route for viewing the cart
router.get('/cart', verifyToken(['user']), async (req, res) => {
  try {
    // Cart logic here
    res.json({ message: 'Cart viewed successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
