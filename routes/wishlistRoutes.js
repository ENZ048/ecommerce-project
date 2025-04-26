const express = require('express');
const wishlistController = require('../controllers/wishlistController');

const router = express.Router();

router.post('/wishlist/add', wishlistController.addToWishlist);

router.delete('/wishlist/delete', wishlistController.removeFromWishlist);

router.get('/wishlist/:userId', wishlistController.getWishlist);

module.exports = router;
