const { getAllProducts,
  productById,
  addProduct,
  getProductName,
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

module.exports = {
  getAll,
  byId,
  newProduct,
};
