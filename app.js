// app.js

const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

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
app.post('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html')); // index.html 서빙
})

// 서버 시작
app.listen(port, () => {
  console.log(`서버 ON: http://localhost:${port}/`)
})