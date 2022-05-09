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

module.exports = {
  getAllSale,
  saleById,
};