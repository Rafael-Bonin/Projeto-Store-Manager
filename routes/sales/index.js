const express = require('express');
const { allSales } = require('../../controllers/salesController');

const salesRouter = express.Router();

salesRouter.get('/', allSales);

module.exports = salesRouter;
