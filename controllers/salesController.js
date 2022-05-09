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

module.exports = {
  allSales,
  salesById,
};
