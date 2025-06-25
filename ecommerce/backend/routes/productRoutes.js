const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');
const { getAllProducts, addProduct, updateProduct, deleteProduct } = require('../controllers/productController');

// User Routes
router.get('/products', getAllProducts);

// Admin Routes
router.post('/products', verifyToken(['admin']), addProduct);
router.put('/products/:id', verifyToken(['admin']), updateProduct);
router.delete('/products/:id', verifyToken(['admin']), deleteProduct);

module.exports = router;
