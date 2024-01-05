// src/Databases/productInfo.js

const mysql = require('mysql2/promise');

// 데이터베이스 연결 설정
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'productInfo',
});

// 데이터베이스 생성 쿼리문
const createDatabaseQuery = 'CREATE DATABASE IF NOT EXISTS productInfo';

// 테이블 생성 쿼리문
const createTableQuery = `
  CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    NAME VARCHAR(255) NOT NULL,
    PRICE DECIMAL(10, 2) NOT NULL,
    QUANTITY INT NOT NULL
  );
`;

// MariaDB 서버에 연결하면, productInfo DB 생성 및 products TABLE 생성
connection.connect()
  .then(async () => {
    try {
      console.log('productInfo DB 연결 성공');

      // 데이터베이스 생성 쿼리 실행
      await connection.query(createDatabaseQuery);

      // 테이블 생성 쿼리 실행
      await connection.query(createTableQuery);

      console.log('products TABLE 생성 성공 또는 이미 존재');
    } finally {
      connection.end();
    }
  })
  .catch((error) => {
    console.error('productInfo DB 연결 실패 또는 생성/테이블 생성 실패: ', error.message);
  });

/**
 * 상품 추가를 위한 함수
 * @param {Object} product - 추가할 상품 정보
 * @param {string} product.productName - 상품명
 * @param {number} product.price - 가격
 * @param {number} product.quantity - 수량
 * @returns {Promise<number>} - 추가된 상품의 ID
 */
async function addProduct(product) {
  const { productName, price, quantity } = product;
  const sql = `
    INSERT INTO products (productName, price, quantity)
    VALUES (?, ?, ?)
  `;
  const params = [productName, price, quantity];

  try {
    const [result] = await connection.execute(sql, params);
    return result.insertId;
  } catch (error) {
    console.error('상품 추가 중 오류 발생:', error.message);
    throw error;
  }
}

module.exports = { addProduct };
