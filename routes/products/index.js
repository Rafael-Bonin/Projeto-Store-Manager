const express = require('express');
const { allProducts } = require('../../controllers/productsController');

const productsRouter = express.Router();

productsRouter.get('/', allProducts);

module.exports = productsRouter;
