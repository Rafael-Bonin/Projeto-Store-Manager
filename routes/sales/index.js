const express = require('express');
const { allSales, salesById, addSale, updateSale } = require('../../controllers/salesController');
const { validateQuantity, validateProductId } = require('../../middlewares/validateSalesMdw');

const salesRouter = express.Router();

salesRouter.get('/', allSales);
salesRouter.get('/:id', salesById);
salesRouter.post('/', validateQuantity, validateProductId, addSale);
salesRouter.put('/:id', validateQuantity, validateProductId, updateSale);

module.exports = salesRouter;
