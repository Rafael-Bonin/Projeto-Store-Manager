const express = require('express');
const { allProducts, productById, insertProduct } = require('../../controllers/productsController');
const { validateName, validateQuantity } = require('../../middlewares/validateProductsMdw');

const productsRouter = express.Router();

productsRouter.get('/', allProducts);
productsRouter.get('/:id', productById);
productsRouter.post('/', validateName, validateQuantity, insertProduct);

module.exports = productsRouter;
