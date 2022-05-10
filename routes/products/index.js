const express = require('express');
const { allProducts,
  productById,
  insertProduct,
  editProduct } = require('../../controllers/productsController');
const { validateName, validateQuantity } = require('../../middlewares/validateProductsMdw');

const productsRouter = express.Router();

productsRouter.get('/', allProducts);
productsRouter.get('/:id', productById);
productsRouter.post('/', validateName, validateQuantity, insertProduct);
productsRouter.put('/:id', validateName, validateQuantity, editProduct);

module.exports = productsRouter;
