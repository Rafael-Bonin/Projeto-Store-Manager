const connection = require('./connection');

const serialize = (data) => ({ saleId: data.sale_id,
date: data.date,
productId: data.product_id,
quantity: data.quantity });

const getAllSale = async () => {
  const [result] = await connection.execute(`SELECT sp.sale_id,
   s.date,
    sp.product_id,
     sp.quantity
      FROM sales_products sp 
      INNER JOIN sales s 
      ON s.id = sp.sale_id ORDER BY s.id, sp.product_id;`);
  return result.map(serialize);
};

const saleById = async (id) => {
  const [result] = await connection.execute(`SELECT 
    s.date,
    sp.product_id,
    sp.quantity
    FROM
    sales_products sp
    INNER JOIN sales s ON s.id = sp.sale_id
    WHERE s.id = ?;`, [id]);
  return result.map(serialize);
};

const addSale = async (array) => {
  await connection.execute('INSERT INTO sales (date) VALUES (NOW());');
  const [getId] = await connection.execute('SELECT MAX(id) AS id FROM sales;');
  array.map(async (a) => {
    const insert = await connection
    .execute(`INSERT INTO sales_products VALUES(${getId[0].id}, ?, ?);`, [a.productId, a.quantity]);
    return insert;
  });
  return { id: getId[0].id, itemsSold: array };
};

const updateSale = async (id, productId, quantity) => {
  await connection.execute(`UPDATE sales_products
    SET product_id = ?,
    quantity = ?
    WHERE sale_id = ?;`, [productId, quantity, id]);
  return { saleId: id,
itemUpdated: [{
      productId,
      quantity,
    }, 
  ] };
};

module.exports = {
  getAllSale,
  saleById,
  addSale,
  updateSale,
};