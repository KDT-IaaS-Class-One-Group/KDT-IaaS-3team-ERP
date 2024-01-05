// src/Databases/productInfo.js

const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'productInfo' // 새로운 데이터베이스 이름으로 수정
});

// 데이터베이스를 생성하는 쿼리문
const createDatabaseQuery = 'CREATE DATABASE IF NOT EXISTS productInfo';

// 테이블을 생성하는 쿼리문
const createTableQuery = `
  CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    productName VARCHAR(255) NOT NULL,
    productDescription TEXT,
    price DECIMAL(10, 2) NOT NULL,
    quantity INT NOT NULL
  );
`;

// MariaDB 서버에 연결하면, productInfo DB 생성 및 products TABLE 생성
pool.getConnection()
  .then(async (connection) => {
    try {
      console.log('productInfo DB 연결 성공');

      // 데이터베이스 생성 쿼리 실행
      await connection.query(createDatabaseQuery);

      // 테이블 생성 쿼리 실행
      await connection.query(createTableQuery);

      console.log('products TABLE 생성 성공 또는 이미 존재');
    } finally {
      connection.release();
    }
  })
  .catch((error) => {
    console.error('productInfo DB 연결 실패: ', error.message);
  });

// 상품 추가를 위한 함수
async function addProduct(product) {
  const { productName, productDescription, price, quantity } = product;
  const sql = `
    INSERT INTO products (productName, productDescription, price, quantity)
    VALUES (?, ?, ?, ?)
  `;
  const params = [productName, productDescription, price, quantity];

  try {
    const [result] = await pool.execute(sql, params);
    return result.insertId;
  } catch (error) {
    console.error('상품 추가 중 오류 발생:', error.message);
    throw error;
  }
}

module.exports = { addProduct };
