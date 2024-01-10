// src/Databases/productInfo.js

const mysql = require('mysql2/promise');

const databaseName = 'productInfo';
const tableName = 'products';

// 데이터베이스 연결 풀 생성
let pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: databaseName
});

// 데이터베이스 초기화 함수
async function initializeDatabase() {
  try {
    // 데이터베이스 생성 쿼리 실행
    await pool.query(`CREATE DATABASE IF NOT EXISTS ${databaseName}`);

    // 테이블 생성 쿼리 실행
    await pool.query(`
      CREATE TABLE IF NOT EXISTS ${tableName} (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        price INT NOT NULL,
        quantity INT NOT NULL
      );
    `);

    console.log(`초기화 완료!\n - DB명: ${databaseName}\n - TABLE명: ${tableName}`);
  } catch (error) {
    console.error('초기화 실패: ', error.message);
  }
}

// 데이터베이스 초기화 함수 호출
initializeDatabase();

// query 함수 정의
async function productQuery(sql, params) {
  // 쿼리 실행 전에 연결 상태 체크
  if (pool._closed) {
    console.error('Pool is closed. Reconnecting...');
    // 연결이 닫혔다면 새로운 연결 생성
    pool = mysql.createPool({
      host: 'localhost',
      user: 'root',
      password: '1234',
      database: databaseName
    });
  }

  const [rows] = await pool.execute(sql, params);
  return rows;
}

// query 함수 내보내기
module.exports = { productQuery };