const { getAllSale } = require('../models/salesModel');

const getAll = async () => {
  const all = await getAllSale();
  return all;
};

module.exports = {
  getAll,
};
