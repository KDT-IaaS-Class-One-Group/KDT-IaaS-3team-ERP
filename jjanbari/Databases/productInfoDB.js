// Databases/productInfoDB.js

const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'productInfoDB',
});

module.exports = connection;
