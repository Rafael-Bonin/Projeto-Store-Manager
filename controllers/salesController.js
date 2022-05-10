const sales = require('../services/salesService');

const allSales = async (_req, res) => {
  try {
    const all = await sales.getAll();
    return res.status(200).json(all);
  } catch (err) {
    console.log('erro no sales', err.message);
  }
};

const salesById = async (req, res) => {
  try {
    const { id } = req.params;
    const ids = await sales.byId(id);
    return res.status(200).json(ids);
  } catch (err) {
    return res.status(404).json({ message: err.message });
  }
};

const addSale = async (req, res) => {
  try {
    const array = req.body;
    console.log(array);
    const added = await sales.createSale(array);
    return res.status(201).json(added);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const updateSale = async (req, res) => {
  try {
    const { productId, quantity } = req.body[0];
    const { id } = req.params;
    const updated = await sales.editSale(id, productId, quantity);
    return res.status(200).json(updated);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = {
  allSales,
  salesById,
  addSale,
  updateSale,
};
