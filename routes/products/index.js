const express = require('express');
const { allProducts, productById } = require('../../controllers/productsController');

const productsRouter = express.Router();

productsRouter.get('/', allProducts);
productsRouter.get('/:id', productById);

module.exports = productsRouter;
