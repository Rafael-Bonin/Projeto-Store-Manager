const express = require('express');
const { allSales, salesById, addSale } = require('../../controllers/salesController');

const salesRouter = express.Router();

salesRouter.get('/', allSales);
salesRouter.get('/:id', salesById);
salesRouter.post('/', addSale);

module.exports = salesRouter;
