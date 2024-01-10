// src/Databases/userInfo.js

const mysql = require('mysql2');

const databaseName = 'userInfo';
const tableName = 'users';



let pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: databaseName
})







// 데이터베이스를 생성하는 쿼리문
const createDatabaseQuery = 'CREATE DATABASE IF NOT EXISTS userInfo';

// 테이블을 생성하는 쿼리문
const createTableQuery = `
  CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  userID VARCHAR(255) NOT NULL,
  userPW VARCHAR(255) NOT NULL,
  userNAME VARCHAR(255) NOT NULL
  );
`;

// MariaDB 서버에 연결하면, userInfo DB 생성 및 users TABLE 생성
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

module.exports = connection;