const models = require('../models/salesModel');

const getAll = async () => {
  const all = await models.getAllSale();
  return all;
};

const byId = async (id) => {
  const ids = await models.saleById(id);
  if (ids.length === 0) throw new Error('Sale not found');
  return ids;
};

const createSale = async (array) => {
  const add = await models.addSale(array);
  return add;
};

const editSale = async (id, productId, quantity) => {
  const update = await models.updateSale(id, productId, quantity);
  return update;
};

const removeSale = async (id) => {
  const ids = await models.saleById(id);
  if (ids.length === 0) throw new Error('Sale not found');
  const result = models.deleteSale(id);
  return result;
};

const productsSales = async (id) => {
  const result = await models.getSaleProducts(id);
  return result;
};

module.exports = {
  getAll,
  byId,
  createSale,
  editSale,
  removeSale,
  productsSales,
};
