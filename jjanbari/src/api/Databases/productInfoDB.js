// Databases/productInfoDB.js

const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'productInfoDB',
});

// 유효성 검사 함수 추가
const isValidProduct = (product) => {
  return (
    product &&
    product.name && typeof product.name === 'string' &&
    product.price && typeof product.price === 'number' && product.price >= 0 &&
    product.quantity && typeof product.quantity === 'number' && product.quantity >= 0
  );
};

// 상품 정보 저장 함수
const saveProduct = (product) => {
  return new Promise((resolve, reject) => {
    if (!isValidProduct(product)) {
      reject(new Error('유효하지 않은 상품 정보입니다.'));
      return;
    }

    // 중복된 name 확인
    const checkDuplicateQuery = `
      SELECT * FROM productInfo
      WHERE name = ?;
    `;

    connection.query(checkDuplicateQuery, [product.name], (error, results) => {
      if (error) {
        reject(error);
        return;
      }

      if (results.length > 0) {
        // 중복된 name이 이미 존재하는 경우
        reject(new Error('이미 존재하는 상품명입니다.'));
      } else {
        // 중복된 name이 없는 경우, 데이터베이스에 저장
        const insertDataQuery = `
          INSERT INTO productInfo (name, price, quantity)
          VALUES (?, ?, ?);
        `;

        connection.query(insertDataQuery, [product.name, product.price, product.quantity], (error, insertResults) => {
          if (error) {
            reject(error);
          } else {
            resolve(insertResults);
          }
        });
      }
    });
  });
};

// 상품명으로 상품 조회 함수
const getProductByName = (name) => {
  return new Promise((resolve, reject) => {
    const selectDataQuery = `
      SELECT * FROM productInfo
      WHERE name = ?;
    `;

    connection.query(selectDataQuery, [name], (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
};

module.exports = {
  connection: connection,
  saveProduct: saveProduct,
  getProductByName: getProductByName,
};
