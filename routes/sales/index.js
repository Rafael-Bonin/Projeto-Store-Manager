const express = require('express');
const { allSales, salesById } = require('../../controllers/salesController');

const salesRouter = express.Router();

salesRouter.get('/', allSales);

salesRouter.get('/:id', salesById);

module.exports = salesRouter;
