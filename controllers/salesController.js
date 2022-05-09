const sales = require('../services/salesService');

const allSales = async (_req, res) => {
  try {
    const all = await sales.getAll();
    return res.status(200).json(all);
  } catch (err) {
    console.log('erro no sales', err.message);
  }
};

module.exports = {
  allSales,
};
