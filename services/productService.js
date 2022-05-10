const { getAllProducts,
  productById,
  addProduct,
  getProductName,
  updateProduct,
  deleteProduct,
} = require('../models/productsModel');

const getAll = async () => {
  const all = await getAllProducts();
  return all;
};

const byId = async (id) => {
  const idResult = await productById(id);
  if (idResult.length === 0) throw new Error('Product not found');
  return idResult;
};

const newProduct = async (name, quantity) => {
  const exists = await getProductName(name);
  if (exists.length > 0) throw new Error('Product already exists');
  const query = await addProduct(name, quantity);
  return query;
};

const changeProduct = async (id, name, quantity) => {
  const exists = await productById(id);
  if (exists.length === 0) throw new Error('Product not found');
  const update = await updateProduct(id, name, quantity);
  return update;
};

const removeProduct = async (id) => {
  const exists = await productById(id);
  if (exists.length === 0) throw new Error('Product not found');
  const remove = await deleteProduct(id);
  return remove;
};

module.exports = {
  getAll,
  byId,
  newProduct,
  changeProduct,
  removeProduct,
};
