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

// Express 서버 라우트 설정
app.get('/', (req, res) => {
  // MariaDB에서 데이터 가져오기
  db.query('SELECT * FROM TEST', (error, results) => {
    if (error) throw error;

    // 테이블 형태로 콘솔에 출력
    console.table(results);

    res.json(results);
  });
});

// 서버 실행
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
