const connection = require('./connection');

const getProductName = async (name) => {
  const [result] = await connection.execute('SELECT * FROM products WHERE name=?', [name]);
  return result;
};

const getAllProducts = async () => {
  const [result] = await connection.execute('SELECT * FROM products');
  return result;
};

const productById = async (id) => {
  const [result] = await connection.execute('SELECT * FROM products WHERE id = ?', [id]);
  return result;
};

const addProduct = async (name, quantity) => {
  const [result] = await connection.execute(`INSERT INTO 
  products (name, quantity) VALUES (?, ?);`, [name, quantity]);
  return { id: result.insertId, name, quantity };
};

const updateProduct = async (id, name, quantity) => {
  await connection.execute(`UPDATE products
  SET name = ?,
  quantity = ?
  WHERE id = ?;`, [name, quantity, id]);
  return { id, name, quantity };
};

const deleteProduct = async (id) => {
  await connection.execute('DELETE FROM products WHERE id=?;', [id]);
  return (`Produto ${id} deletado com sucesso`);
};

const getproductQuantity = async (id) => {
  const [[{ quantity }]] = await connection.execute(`SELECT quantity FROM
   products WHERE id = ?`, [id]);
  return quantity;
};

const updateQuantity = async (id, quantity) => {
  await connection.execute('UPDATE products SET quantity = ? WHERE id = ?', [quantity, id]);
};

module.exports = {
  getAllProducts,
  productById,
  addProduct,
  getProductName,
  updateProduct,
  deleteProduct,
  updateQuantity,
  getproductQuantity,
};
