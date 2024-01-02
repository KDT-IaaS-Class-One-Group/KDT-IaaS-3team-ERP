// server.js

const express = require("express");
const path = require("path");

const app = express();
const port = 3000;

// public 폴더를 정적 파일 디렉토리로 설정
app.use(express.static(path.join(__dirname, "public")));

// 루트 경로에 대한 GET 요청 핸들러
app.get("/", (req, res) => {
  // path 모듈을 사용하여 정적 파일의 절대 경로를 지정
  res.sendFile(path.join(__dirname, "public", "test.html"));
});

// 각각의 페이지에 대한 GET 요청 핸들러
app.get('/admin', (req, res) => {
  res.send('관리자 페이지입니다.');
});

app.get('/user', (req, res) => {
  res.send('사용자 페이지입니다.');
});

app.get('/product', (req, res) => {
  res.send('상품 페이지입니다.');
});

app.get('/signup', (req, res) => {
  res.send('회원 가입 페이지입니다.');
});

app.listen(port, () => {
  console.log(`서버 ON: http://localhost:${port}`);
});
