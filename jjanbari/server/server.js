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

// 회원 가입 라우트
app.post('/signup', (req, res) => {
  const { id, password, name } = req.body;

  const insertDataQuery = `
    INSERT INTO userInfo (id, password, name)
    VALUES (?, ?, ?);
  `;

  connection.query(insertDataQuery, [id, password, name], (error, results) => {
    if (error) {
      console.error('회원 가입 실패:', error);
      res.status(500).send('회원 가입에 실패했습니다. 다시 시도해주세요.');
    } else {
      console.log('회원 가입 정보 저장 성공:', req.body);
      res.sendStatus(200);
    }
  });
});

// 로그인 라우트
app.post('/login', (req, res) => {
  const { id, password } = req.body;

  const selectDataQuery = `
    SELECT * FROM userInfo
    WHERE id = ?;
  `;

  connection.query(selectDataQuery, [id], (error, results) => {
    if (error) {
      console.error('로그인 실패: ', error);
      res.status(500).send('로그인에 실패했습니다. 다시 시도해주세요.');
    } else {
      if (results.length > 0) {
        const user = results[0];

        // 비밀번호 비교
        if (user.password === password) {
          if (user.id === 'adroot') {
            // 관리자 로그인 성공
            console.log('관리자로 로그인하였습니다.');
            res.status(201).json({ role: 'admin' });
          } else {
            // 사용자 로그인 성공
            console.log('사용자로 로그인하였습니다.');
            res.status(200).json({ role: 'user' });
          }
        } else {
          console.error('로그인 실패: 비밀번호가 일치하지 않습니다.');
          res.status(401).send('비밀번호가 일치하지 않습니다.');
        }
      } else {
        console.error('로그인 실패: 해당 ID가 존재하지 않습니다.');
        res.status(401).send('해당 ID가 존재하지 않습니다.');
      }
    }
  });
});

// 관리자 페이지 라우트
app.get('/admin', (req, res) => {
  res.send('관리자 페이지입니다.');
});

// 사용자 페이지 라우트
app.get('/main', (req, res) => {
  res.send('사용자 페이지입니다.');
});

app.listen(port, () => {
  console.log(`서버 ON: http://localhost:${port} 에서 실행 중입니다.`);
});
