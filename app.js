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

//* GET 요청 처리
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html')); // index.html 서빙
})
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html')); // login.html 서빙
})
app.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'signup.html')); // signup.html 서빙
})
app.get('/withdraw', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'withdraw.html')); // withdraw.html 서빙
})

//* POST 요청 처리
// signup 페이지
app.post('/signup', (req, res) => {
  const { NAME, ID, PW } = req.body;

  // MariaDB에 데이터 삽입
  const sql = 'INSERT INTO userinfo (name, id, password) VALUES (?, ?, ?)';
  db.query(sql, [NAME, ID, PW], (err, result) => {
    if (err) {
      console.log('회원 가입 실패: ', err);
      res.status(500).send('회원가입에 실패했습니다.');
    } else {
      console.log('회원 가입 성공, 로그인 페이지로 이동~');
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
      console.log('로그인 실패: 회원 가입 필요');

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

// withdraw 페이지
app.post('/withdraw', (req, res) => {
  // 입력 폼에서 받아온 사용자 ID와 사용자 이름
  const { ID, NAME } = req.body;

  // 사용자 ID와 사용자 이름을 사용해 DB에서 해당 사용자 정보를 조회
  const selectSQL = 'SELECT * FROM userinfo WHERE id = ? AND name = ?';

  db.query(selectSQL, [ID, NAME], (err, result) => {
    // 에러 처리
    if (err) {
      console.log('회원 탈퇴 조회 실패: ', err);
      // 회원 탈퇴 페이지 안내
      return res.status(500).send('회원 탈퇴 중 오류가 발생했습니다.');
    }

    // 조회된 결과가 없는 경우 (ID 또는 이름이 일치하지 않음)
    if (result.length === 0) {
      console.log('회원 탈퇴 실패: ID와 이름이 일치하지 않음');
      return res.status(404).send('해당 ID 또는 이름을 찾을 수 없습니다.');
    }

    // 사용자 ID와 사용자 이름을 사용해 DB에서 해당 사용자 정보를 삭제
    const deleteSQL = 'DELETE FROM userinfo WHERE id = ? AND name = ?';

    db.query(deleteSQL, [ID, NAME], (err, result) => {
      // 에러 처리
      if (err) {
        console.log('회원 탈퇴 실패: ', err);
        // 회원 탈퇴 페이지 안내
        return res.status(500).send('회원 탈퇴 중 오류가 발생했습니다.');
      }

      console.log('회원 탈퇴 완료');
      // 회원 탈퇴 성공 시, 응답을 전송
      res.send('회원 탈퇴가 완료되었습니다.');
    });
  });
});

// 서버 시작
app.listen(port, () => {
  console.log(`서버 ON: http://localhost:${port}/`)
})