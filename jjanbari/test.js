// test.js

const express = require('express');
const mysql = require('mysql2');

const app = express();

// MariaDB 연결 설정
const db = mysql.createConnection({
  host: 'forteam3.c9kusawuiwxh.ap-northeast-2.rds.amazonaws.com',
  user: 'root',
  password: 'qwer1234',
  database: 'jjanbariERP',
});

// TEST 테이블 추가
db.query(`CREATE TABLE IF NOT EXISTS TEST (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  age INT,
  email VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`)

// Express 서버 라우트 설정
app.get('/', (req, res) => {
  // MariaDB에서 데이터 가져오기 예제
  db.query('SELECT * FROM TEST', (error, results) => {
    if (error) throw error;

    // 테이블 형태로 결과 콘솔에 출력
    console.table(results);

    // HTML 페이지 렌더링
    const html = `
      <html>
        <head>
          <title>TEST Table Data</title>
        </head>
        <body>
          <h1>TEST Table Data</h1>
          <table border="1">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Age</th>
              <th>Email</th>
              <th>Created At</th>
            </tr>
            ${results.map(row => `
              <tr>
                <td>${row.id}</td>
                <td>${row.name}</td>
                <td>${row.age}</td>
                <td>${row.email}</td>
                <td>${row.created_at}</td>
              </tr>
            `).join('')}
          </table>
        </body>
      </html>
    `;

    res.send(html);
  });
});

// 내 정보를 추가
const myProfile = {
  name: 'BHN',
  age: 26,
  email: 'dev.honing@gmail.com',
};

db.query('INSERT INTO TEST SET ?', myProfile, (error, result) => {
  if (error) throw error;
  console.log('New data added:', result);
});

// 서버 실행
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
