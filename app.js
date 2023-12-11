// app.js: 서버 생성

const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

// 정적 파일 서빙: public 폴더
app.use(express.static(path.join(__dirname, 'public')));

// index.html을 서빙하기 위한 라우팅
app.get('/', (req, res) => {
  res.send(path.join(__dirname, 'index.html'));
});

// 서버 시작
app.listen(port, () => {
  console.log(`서버 ON: http://localhost:${port}`);
});
