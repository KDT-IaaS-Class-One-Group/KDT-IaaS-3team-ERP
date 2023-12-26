// databases/productInfoDB.js

const mysql = require('mysql2');

const productInfoDB = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
});

productInfoDB.connect((err) => {
  if(err) {
    console.error('productInfoDB 연결 실패: ', err);
  } else {
    console.log('productInfoDB 연결 성공');

    // productInfoDB 데이터베이스가 없다면 생성
    productInfoDB.query('CREATE DATABASE IF NOT EXISTS productInfoDB', (err) => {
      if (err) throw err;

      // productInfoDB 데이터베이스 선택
      productInfoDB.query('USE productInfoDB', (err) => {
        if (err) throw err;

        // productInfo 테이블 생성
        productInfoDB.query('CREATE TABLE IF NOT EXISTS productInfo (name VARCHAR(255), price INT, quantity INT)', (err) => {
          if (err) throw err;
          console.log('productInfoDB 및 productInfo 테이블 생성 완료');
        });
      });
    });
  }
});


module.exports = productInfoDB;