const mysql = require('mysql2');

const databaseName = 'userInfo';
const tableName = 'users';

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: databaseName
});

// 데이터베이스를 생성하는 쿼리문
const createDatabaseQuery = `CREATE DATABASE IF NOT EXISTS ${databaseName}`;

// 테이블을 생성하는 쿼리문
const createTableQuery = `
  CREATE TABLE IF NOT EXISTS ${tableName} (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL
  );
`;

// MariaDB 서버에 연결
connection.connect((error) => {
  if (error) {
    console.error(`${databaseName} DB 연결 실패: `, error.message);
    return;
  }

  // 데이터베이스 생성 쿼리 실행
  connection.query(createDatabaseQuery, (dbError) => {
    if (dbError) {
      console.error(`${databaseName} DB 생성 실패: `, dbError.message);
      connection.end(); // 에러 발생 시 연결 종료
      return;
    }

    // 테이블 생성 쿼리 실행
    connection.query(createTableQuery, (tableError) => {
      if (tableError) {
        console.error(`${tableName} TABLE 생성 실패: `, tableError.message);
      } else {
        console.log(`[${databaseName}].${tableName} 초기화 완료`);
      }

      // 연결 종료
      connection.end();
    });
  });
});

module.exports = connection;
