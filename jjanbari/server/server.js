// server/server.js

const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors'); // CORS 미들웨어 추가

const app = express();
const port = 3001;

app.use(cors()); // 모든 경로에 대해 CORS 허용
app.use(bodyParser.json());

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'userInfoDB',
});

app.post('/signup', (req, res) => {
  const { id, password, name } = req.body;

  connection.connect();

  const insertDataQuery = `
    INSERT INTO userInfo (id, password, name)
    VALUES (?, ?, ?);
  `;

  connection.query(insertDataQuery, [id, password, name], (error, results) => {
    connection.end();

    if (error) {
      console.error('회원 가입 실패:', error);
      res.status(500).send('회원 가입에 실패했습니다. 다시 시도해주세요.');
    } else {
      console.log('회원 가입 정보 저장 성공:', req.body);
      res.sendStatus(200);
    }
  });
});

app.listen(port, () => {
  console.log(`서버가 http://localhost:${port} 에서 실행 중입니다.`);
});
