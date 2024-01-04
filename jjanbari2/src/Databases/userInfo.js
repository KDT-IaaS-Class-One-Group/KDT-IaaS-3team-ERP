// src/Databases/userInfo.js

const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'userInfo'
})

// 데이터베이스를 생성하는 쿼리문
const createDatabaseQuery = 'CREATE DATABASE IF NOT EXISTS userInfo';

// 테이블을 생성하는 쿼리문
const createTableQuery = `
  CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL
  );
`;
// 아이디로 사용자 조회
const getUserById = (id) => {
  return new Promise((resolve, reject) => {
    const selectDataQuery = `
      SELECT * FROM users
      WHERE id = ?;
    `;

    connection.query(selectDataQuery, [id], (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results[0]);
      }
    });
  });
};

// MariaDB 서버에 연결하면, userInfo DB 생성 및 users 테이블 생성
connection.connect((error) => {
  if (error) {
    console.error('userInfo DB 연결 실패: ', error.message);
  } else {
    console.log('userInfo DB 연결 성공');

    // 데이터베이스 생성 쿼리 실행
    connection.query(createDatabaseQuery, (dbError) => {
      if (dbError) {
        console.error('userInfo DB 생성 실패: ', dbError.message);
      } else {
        console.log('userInfo DB 생성 성공 또는 이미 존재');

        // 테이블 생성 쿼리 실행
        connection.query(createTableQuery, (tableError) => {
          if (tableError) {
            console.error('users TABLE 생성 실패: ', tableError.message);
          } else {
            console.log('users TABLE 생성 성공 또는 이미 존재');
          }
        });
      }
    });
  }
});

module.exports = {
  connection: connection,
  getUserById
};