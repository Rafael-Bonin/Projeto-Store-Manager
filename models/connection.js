const mysql = require('mysql2');

const connection = mysql.createPool({
  user: 'root',
  password: 'docker',
  host: 'localhost',
  database: 'model_example',
});

module.exports = connection;