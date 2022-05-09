const connection = require('./connection');

const getAllProducts = async () => {
  const [result] = await connection.execute('SELECT * FROM products');
  return result;
};

const productById = async (id) => {
  const [result] = await connection.execute('SELECT * FROM products WHERE id = ?', [id]);
  return result;
};

const getProductName = async (name) => {
  const [result] = await connection.execute('SELECT * FROM products WHERE name=?', [name]);
  return result;
};

const addProduct = async (name, quantity) => {
  const [result] = await connection.execute(`INSERT INTO 
  products (name, quantity) VALUES (?, ?);`, [name, quantity]);
  return { id: result.insertId, name, quantity };
};

module.exports = {
  getAllProducts,
  productById,
  addProduct,
  getProductName,
};
