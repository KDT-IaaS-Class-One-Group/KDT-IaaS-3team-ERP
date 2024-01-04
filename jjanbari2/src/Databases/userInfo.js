// src/Databases/userInfo.js

const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
})

// 데이터베이스를 생성하는 쿼리문
const createDatabaseQuery = 'CREATE DATABASE IF NOT EXISTS userInfo';

// MariaDB 서버에 연결하면, userInfo DB 생성
connection.connect((error) => {
  if (error) {
    console.error('데이터베이스 연결 오류: ', error.message);
  } else {
    console.log('데이터베이스에 연결되었습니다.');

    connection.query(createDatabaseQuery, (dbError) => {
      if (dbError) {
        console.error('데이터베이스 생성 오류: ', dbError.message);
      } else {
        console.log('데이터베이스 생성 성공 또는 이미 존재함');
      }
    });
  }
});

module.exports = connection;