// src/Databases/productInfo.js

const mysql = require('mysql2/promise');

const databaseName = 'productInfo';
const tableName = 'products';

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: databaseName
});

// 데이터베이스를 생성하는 쿼리문
const createDatabaseQuery = `CREATE DATABASE IF NOT EXISTS ${databaseName}`;

// 테이블을 생성하는 쿼리문
const createTableQuery = `
  CREATE TABLE IF NOT EXISTS ${tableName} (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price INT NOT NULL,
    quantity INT NOT NULL
  );
`;

// 데이터베이스 초기화 함수
async function initializeDatabase() {
  try {
    // 데이터베이스 생성 쿼리 실행
    await pool.query(createDatabaseQuery);

    // 테이블 생성 쿼리 실행
    await pool.query(createTableQuery);

    console.log(`초기화 완료!\n - DB명: ${databaseName}\n - TABLE명: ${tableName}`);
  } catch (error) {
    console.error('초기화 실패: ', error.message);
  } finally {
    // 풀 연결 해제
    pool.end();
  }
}

// 데이터베이스 초기화 함수 호출
initializeDatabase();
