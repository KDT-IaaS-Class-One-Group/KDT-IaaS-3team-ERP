// src/Databases/userInfo.js

const mysql = require('mysql2/promise');

const databaseName = 'userInfo';
const tableName = 'users';

let pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: databaseName
})

// 데이터베이스 초기화 함수
async function initializeDatabase() {
  try {
    // 데이터베이스 생성 쿼리 실행
    await pool.query(`CREATE DATABASE IF NOT EXISTS ${databaseName}`);

    // 테이블 생성 쿼리 실행
    await pool.query(`
      CREATE TABLE IF NOT EXISTS ${tableName} (
        id INT AUTO_INCREMENT PRIMARY KEY,
        userID VARCHAR(255) NOT NULL,
        userPW VARCHAR(255) NOT NULL,
        userNAME VARCHAR(255) NOT NULL
      );
    `);

    console.log(`초기화 완료!\n - DB명: ${databaseName}\n - TABLE명: ${tableName}`);
  } catch (error) {
    console.error('초기화 실패: ', error.message);
  }
}

// 데이터베이스 초기화 함수 호출
initializeDatabase();

// connection 함수 정의
async function connection(sql, params) {
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

// connection 함수 내보내기
module.exports = { connection };
