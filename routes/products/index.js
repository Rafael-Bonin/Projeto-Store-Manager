const express = require('express');
const { allProducts, productById, insertProduct } = require('../../controllers/productsController');

const productsRouter = express.Router();

productsRouter.get('/', allProducts);
productsRouter.get('/:id', productById);
productsRouter.post('/', insertProduct);

module.exports = productsRouter;
