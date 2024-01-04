// app.js

// 필요한 모듈 가져오기
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const userInfoDB = require('./databases/userInfoDB');
const productInfoDB = require('./databases/productInfoDB');

// Express 서버를 위한 변수 선언
const app = express();
const port = 3000;

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
app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'admin.html')) // admin.html 서빙
})

//* POST 요청 처리
// signup 페이지
app.post('/signup', (req, res) => {
  const { NAME, ID, PW } = req.body;

  // MariaDB에서 중복된 ID 체크
  const checkDuplicateIdSQL = 'SELECT * FROM userinfo WHERE id = ?';

  userInfoDB.query(checkDuplicateIdSQL, [ID], (err, result) => {
    if (err) {
      console.error('ID 중복 체크 실패: ', err);
      return res.status(500).send('회원 가입 중 오류가 발생했습니다.');
    }

    // 중복된 ID가 존재하는 경우
    if (result.length > 0) {
      console.log('회원 가입 실패: 중복된 ID');
      return res.status(409).send('이미 사용 중인 ID입니다. 다른 ID를 선택해주세요.');
    }

    // MariaDB에 데이터 삽입
    const insertUserSQL = 'INSERT INTO userinfo (name, id, password) VALUES (?, ?, ?)';
    userInfoDB.query(insertUserSQL, [NAME, ID, PW], (err, result) => {
      if (err) {
        console.error('회원 가입 실패: ', err);
        return res.status(500).send('회원 가입 중 오류가 발생했습니다.');
      }

      console.log('회원 가입 성공, 로그인 페이지로 이동');
      res.redirect('/login');
    });
  });
});

// login 페이지
app.post('/login', (req, res) => {
  // 요청으로부터 받은 데이터의 ID와 PW를 추출
  const { ID, PW } = req.body;

  // 사용자 자격 증명 유효성 검사
  const sql = 'SELECT * FROM userinfo WHERE id = ?';

  // MariaDB에 쿼리를 보내서 사용자 정보를 검색
  userInfoDB.query(sql, [ID], (err, results) => {
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

  userInfoDB.query(selectSQL, [ID, NAME], (err, result) => {
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

    userInfoDB.query(deleteSQL, [ID, NAME], (err, result) => {
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

// product 페이지
app.post('/product', (req, res) => {
  const { NAME, PRICE, QUANTITY } = req.body;

  // productInfoDB에서 중복된 상품명을 체크
  const checkDuplicateNameSQL = 'SELECT * FROM productInfo WHERE name = ?';

  productInfoDB.query(checkDuplicateNameSQL, [NAME], (err, result) => {
    if (err) {
      console.error('상품 등록 실패: 중복 체크 오류', err);
      return res.status(500).send('상품 등록 중 오류가 발생했습니다.');
    }

    // 중복된 상품명이 존재하는 경우
    if (result.length > 0) {
      console.log('상품 등록 실패: 중복된 상품명');
      return res.status(409).send('이미 등록된 상품명입니다. 다른 상품명을 선택해주세요.');
    }

    // 중복이 없는 경우, 상품을 추가
    const insertProductSQL = 'INSERT INTO productInfo (name, price, quantity) VALUES (?, ?, ?)';
    productInfoDB.query(insertProductSQL, [NAME, PRICE, QUANTITY], (err, result) => {
      if (err) {
        console.error('상품 등록 실패: ', err);
        return res.status(500).send('상품 등록 중 오류가 발생했습니다.');
      }

      console.log('상품 등록 성공');
      // 성공 시, 추가적인 로직을 수행하거나 응답을 전송할 수 있습니다.
      res.send('상품 등록이 완료되었습니다.');
    });
  });
});

// API 엔드포인트 추가: productInfo 테이블의 모든 데이터를 가져오는 엔드포인트
app.get('/api/products', (req, res) => {
  const selectAllProductsSQL = 'SELECT * FROM productInfo';
  productInfoDB.query(selectAllProductsSQL, (err, result) => {
    if (err) {
      console.error('상품 조회 실패: ', err);
      return res.status(500).send('상품 조회 중 오류가 발생했습니다.');
    }

    // 조회 결과를 클라이언트로 전송
    res.json(result);
  });
});

// 서버 시작
app.listen(port, () => {
  console.log(`서버 ON: http://localhost:${port}/`)
})