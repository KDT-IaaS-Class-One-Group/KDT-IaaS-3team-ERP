// app.js

// 필요한 모듈 가져오기
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

// Express 서버를 위한 변수 선언
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

//* POST 요청 처리
// signup 페이지
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

// login 페이지
app.post('/login', (req, res) => {
  // 요청으로부터 받은 데이터의 ID와 PW를 추출
  const { ID, PW } = req.body;

  // 사용자 자격 증명 유효성 검사
  const sql = 'SELECT * FROM userinfo WHERE id = ?';

  // MariaDB에 쿼리를 보내서 사용자 정보를 검색
  db.query(sql, [ID], (err, results) => {
    // 에러 처리
    if (err) {
      console.error('로그인 처리 실패: ', err);
      return res.status(500).send('로그인에 실패했습니다.');
    }

    // 로그인 실패 시, 결과가 없는 경우
    if (results.length === 0) {
      // 서버 콘솔 출력
      console.log('로그인 실패: 회원가입 필요');

      // 로그인 페이지 안내
      return res.status(401).send('입력하신 ID가 존재하지 않습니다. 회원가입이 필요합니다.');
    }

    // 아이디는 존재하나 비밀번호가 틀린 경우
    const user = results[0]; // 첫 번째로 검색된 사용자 정보를 가져옴
    if (user.password !== PW) {
      // 서버 콘솔 출력
      console.log('로그인 실패: 비밀번호 입력 실수');
      
      // 로그인 페이지 안내
      return res.status(401).send('비밀번호가 틀렸습니다.');
    }

    // 로그인 성공 시, 메인 페이지로 리다이렉트
    res.redirect('/');
  });
});

// 서버 시작
app.listen(port, () => {
  console.log(`서버 ON: http://localhost:${port}/`)
})