// app.js: 서버 생성

const express = require('express');
const path = require('path');
const route = require('./routes/route'); // route.js 파일 불러오기

const app = express();
const port = 3000;

// 정적 파일 서빙: public 폴더
app.use(express.static(path.join(__dirname, 'public')));

// 라우팅 처리
app.use('/', route);

// 서버 시작
app.listen(port, () => {
  console.log(`서버 ON: http://localhost:${port}`);
});
