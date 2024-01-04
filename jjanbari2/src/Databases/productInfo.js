// src/Databases/productInfo.js

const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'productInfo'
})

// 데이터베이스를 생성하는 쿼리문
const createDatabaseQuery = 'CREATE DATABASE IF NOT EXISTS productInfo';

// MariaDB 서버에 연결하면, productInfo DB 생성
connection.connect((error) => {
  if (error) {
    console.error('productInfo DB 연결 실패: ', error.message);
  } else {
    console.log('productInfo DB 연결 성공.');

    connection.query(createDatabaseQuery, (dbError) => {
      if (dbError) {
        console.error('productInfo DB 생성 실패: ', dbError.message);
      } else {
        console.log('productInfo DB 생성 성공 또는 이미 존재');
      }
    });
  }
});

module.exports = connection;