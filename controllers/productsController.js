const products = require('../services/productService');

const allProducts = async (_req, res) => {
  try {
    const all = await products.getAll();

    return res.status(200).json(all);
  } catch (err) {
    console.log('erro no products', err.message);
  }
};

const productById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await products.byId(id);
    return res.status(200).json(result[0]);
  } catch (err) {
    return res.status(404).json({ message: err.message });
  }
};

const insertProduct = async (req, res) => {
  try {
    const { name, quantity } = req.body;
    const add = await products.newProduct(name, quantity);
    return res.status(201).json(add);
  } catch (err) {
    return res.status(409).json({ message: err.message });
  }
};

module.exports = {
  allProducts,
  productById,
  insertProduct,
};