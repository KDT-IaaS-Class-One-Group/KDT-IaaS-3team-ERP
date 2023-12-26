// app.js

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const app = express();
const port = 3000;

// MariaDB 연결 설정
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
});

// MariaDB 연결
db.connect(err => {
  if (err) {
    console.error('MariaDB 연결 실패:', err);
  } else {
    console.log('MariaDB 연결 성공');

// userInfoDB 데이터베이스가 없다면 생성
db.query('CREATE DATABASE IF NOT EXISTS userInfoDB', (err) => {
  if (err) throw err;
    // userInfoDB 데이터베이스 선택
    db.query('USE userInfoDB', (err) => {
      if (err) throw err;
      // userinfo 테이블 생성
      db.query('CREATE TABLE IF NOT EXISTS userinfo (name VARCHAR(255), id VARCHAR(255), password VARCHAR(255))', (err) => {
        if (err) throw err;
        console.log('userInfoDB 및 userinfo 테이블 생성 완료');
      });
    });
  });
}
});

// body-parser 미들웨어 설정
app.use(bodyParser.urlencoded({ extended: true }));

// 정적 파일 제공을 위한 미들웨어 설정
app.use(express.static(path.join(__dirname, 'public')));

// GET 요청 처리
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html')); // index.html 서빙
})
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html')); // login.html 서빙
})
app.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'signup.html')); // signup.html 서빙
})

// POST 요청 처리
app.post('/signup', (req, res) => {
  const { NAME, ID, PW } = req.body;

  // MariaDB에 데이터 삽입
  const sql = 'INSERT INTO userinfo (name, id, password) VALUES (?, ?, ?)';
  db.query(sql, [NAME, ID, PW], (err, result) => {
    if (err) {
      console.log('회원가입 실패: ', err);
      res.status(500).send('회원가입에 실패했습니다.');
    } else {
      console.log('회원가입 성공, 로그인 페이지로 이동~');
      res.redirect('/login');
    }
  });
});


// 서버 시작
app.listen(port, () => {
  console.log(`서버 ON: http://localhost:${port}/`)
})