// src/Databases/userInfo.js

const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
});

// 데이터베이스 생성 쿼리
const createDatabaseQuery = 'CREATE DATABASE IF NOT EXISTS userInfo';

// 아이디로 사용자 조회
const getUserById = (id) => {
  return new Promise((resolve, reject) => {
    const selectDataQuery = `
      SELECT * FROM userInfo
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

// MySQL 서버에 연결 후 데이터베이스 생성 쿼리 실행
connection.connect((error) => {
  if (error) {
    console.error('데이터베이스 연결 오류:', error.message);
  } else {
    console.log('데이터베이스에 연결되었습니다.');

    connection.query(createDatabaseQuery, (dbError) => {
      if (dbError) {
        console.error('데이터베이스 생성 오류:', dbError.message);
      } else {
        console.log('데이터베이스 생성 성공 (또는 이미 존재함)');
      }
    });
  }
});

module.exports = {
  connection: connection,
  getUserById,
};
