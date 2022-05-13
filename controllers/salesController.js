const sales = require('../services/salesService');
const { updateProductQuantity, getQuantity } = require('../services/productService');

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
    const added = await sales.createSale(array);
    array.map(async (a) => {
      const quantity = await getQuantity(array[0].productId);
      console.log(quantity);
      await updateProductQuantity(a.productId, (quantity - a.quantity));
    });
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

const deleteSale = async (req, res) => {
  try {
    const { id } = req.params;
    const sale = await sales.productsSales(id);
    sale.map(async (s) => {
      const quantity = await getQuantity(s.product_id);
      await updateProductQuantity(s.product_id, (quantity + s.quantity));
    });
    await sales.removeSale(id);
    return res.status(204).end();
  } catch (err) {
    return res.status(404).json({ message: err.message });
  }
};

module.exports = {
  allSales,
  salesById,
  addSale,
  updateSale,
  deleteSale,
};
