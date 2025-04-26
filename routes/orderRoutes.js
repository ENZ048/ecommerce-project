const express = require('express');
const orderController = require('../controllers/orderController');

const router = express.Router();

router.post('/order', orderController.placeOrder);

router.put('/order', orderController.updateOrderStatus);

router.get('/order/:userId', orderController.getUserOrders);

module.exports = router;
