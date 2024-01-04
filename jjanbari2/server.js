// server.js

const express = require('express');

const app = express();
const port = 3001;

// 회원 가입 라우트
app.post('/signup', (req, res) => {
});

app.listen(port, () => {
  console.log(`서버 ON: http://localhost:${port}`);
});
