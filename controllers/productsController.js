const products = require('../services/productService');

const allProducts = async (_req, res) => {
  try {
    const all = await products.getAll();

    return res.status(200).json(all);
  } catch (err) {
    console.log('erro no products', err.message);
  }
};

module.exports = {
  allProducts,
};