const { getAllProducts } = require('../models/productsModel');

const getAll = async () => {
  const all = await getAllProducts();
  return all;
};

module.exports = {
  getAll,
};