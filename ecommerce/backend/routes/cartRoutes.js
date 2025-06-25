const express = require('express');
const Cart = require('../models/Cart'); // Adjust the path based on where you store your Cart model
const router = express.Router();

// Add product to cart
router.post('/cart', async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;
    
    if (!userId || !productId || !quantity) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Check if the cart already exists for this user
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      // Create a new cart if it doesn't exist
      cart = new Cart({ userId, products: [{ productId, quantity }] });
      await cart.save();
      return res.status(201).json({ message: 'Product added to cart', cart });
    }

    // If cart exists, add or update product quantity
    const productIndex = cart.products.findIndex(p => p.productId.toString() === productId.toString());

    if (productIndex > -1) {
      // Update product quantity if already exists
      cart.products[productIndex].quantity += quantity;
    } else {
      // Add a new product to the cart
      cart.products.push({ productId, quantity });
    }

    await cart.save();
    res.json({ message: 'Product added to cart', cart });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
