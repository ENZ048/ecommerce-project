const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

router.post('/cart/add', cartController.addToCart);

router.get('/cart/list/:id', cartController.fetchCart);

router.put('/cart/update', cartController.updateCart);

router.delete('/cart/delete/', cartController.removeFromCart);

module.exports = router;