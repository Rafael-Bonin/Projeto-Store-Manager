const connection = require('./connection');

const getAllSale = async () => {
  const [result] = await connection.execute('SELECT * FROM sales');
  return result;
};

module.exports = {
  getAllSale,
};