const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');

router.get('/products-list', productsController.fetchProductList);

router.get('/product/:id', productsController.fetchProduct);

router.post('/product/create', productsController.creatProduct);

router.put('/product/update/:id', productsController.updateProduct);

router.delete('/product/delete/:id', productsController.deleteProduct);

module.exports = router;