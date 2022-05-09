const { getAllProducts, productById } = require('../models/productsModel');

const getAll = async () => {
  const all = await getAllProducts();
  return all;
};

const byId = async (id) => {
  const idResult = await productById(id);
  if (idResult.length === 0) throw new Error('Product not found');
  return idResult;
};
module.exports = {
  getAll,
  byId,
};
