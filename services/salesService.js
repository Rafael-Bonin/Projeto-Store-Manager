const { getAllSale, saleById, addSale, updateSale,
  deleteSale,
  getSaleProducts } = require('../models/salesModel');

const getAll = async () => {
  const all = await getAllSale();
  return all;
};

const byId = async (id) => {
  const ids = await saleById(id);
  if (ids.length === 0) throw new Error('Sale not found');
  return ids;
};

const createSale = async (array) => {
  const add = await addSale(array);
  return add;
};

const editSale = async (id, productId, quantity) => {
  const update = await updateSale(id, productId, quantity);
  return update;
};

const removeSale = async (id) => {
  const ids = await saleById(id);
  if (ids.length === 0) throw new Error('Sale not found');
  const result = deleteSale(id);
  return result;
};

const productsSales = async (id) => {
  const result = await getSaleProducts(id);
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
