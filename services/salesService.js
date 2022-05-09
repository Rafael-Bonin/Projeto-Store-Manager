const { getAllSale, saleById } = require('../models/salesModel');

const getAll = async () => {
  const all = await getAllSale();
  return all;
};

const byId = async (id) => {
  const ids = await saleById(id);
  if (ids.length === 0) throw new Error('Sale not found');
  return ids;
};

module.exports = {
  getAll,
  byId,
};
