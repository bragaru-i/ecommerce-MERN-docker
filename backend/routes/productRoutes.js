const express = require('express');

const productController = require('../controllers/productsController');

const router = express.Router();

router
  .route('/')
  .get(productController.getAllProducts)
  .post(productController.createProduct);

router
  .route('/:id')
  .get(productController.getProduct)
  .patch(productController.uploadProductPhoto, productController.updateProduct);
// .patch(productController.uploadProductPhoto);

module.exports = router;
