// databases/userInfoDB.js

const mysql = require('mysql2');

const userInfoDB = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
});

userInfoDB.connect((err) => {
  if (err) {
    console.error('userInfoDB 연결 실패:', err);
  } else {
    console.log('userInfoDB 연결 성공');

    // userInfoDB 데이터베이스가 없다면 생성
    userInfoDB.query('CREATE DATABASE IF NOT EXISTS userInfoDB', (err) => {
      if (err) throw err;

      // userInfoDB 데이터베이스 선택
      userInfoDB.query('USE userInfoDB', (err) => {
        if (err) throw err;

        // userinfo 테이블 생성
        userInfoDB.query('CREATE TABLE IF NOT EXISTS userinfo (name VARCHAR(255), id VARCHAR(255), password VARCHAR(255))', (err) => {
          if (err) throw err;
          console.log('userInfoDB 및 userinfo 테이블 생성 완료');
        });
      });
    });
  }
});

module.exports = userInfoDB;
