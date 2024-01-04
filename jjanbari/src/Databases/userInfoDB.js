// Databases/userInfoDB.js

const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'userInfo',
});

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

module.exports = {
  connection: connection,
  getUserById,
};
