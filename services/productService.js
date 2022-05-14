const models = require('../models/productsModel');

const getAll = async () => {
  const all = await models.getAllProducts();
  return all;
};

const byId = async (id) => {
  const idResult = await models.productById(id);
  if (idResult.length === 0) throw new Error('Product not found');
  return idResult;
};

const newProduct = async (name, quantity) => {
  const exists = await models.getProductName(name);
  if (exists.length > 0) throw new Error('Product already exists');
  const query = await models.addProduct(name, quantity);
  return query;
};

const changeProduct = async (id, name, quantity) => {
  const exists = await models.productById(id);
  if (exists.length === 0) throw new Error('Product not found');
  const update = await models.updateProduct(id, name, quantity);
  return update;
};

const removeProduct = async (id) => {
  const exists = await models.productById(id);
  if (exists.length === 0) throw new Error('Product not found');
  const remove = await models.deleteProduct(id);
  return remove;
};

const updateProductQuantity = async (id, quantity) => {
  await models.updateQuantity(id, quantity);
};

const getQuantity = async (id) => {
  const total = await models.getproductQuantity(id);

  return total;
};

module.exports = {
  getAll,
  byId,
  newProduct,
  changeProduct,
  removeProduct,
  updateProductQuantity,
  getQuantity,
};
