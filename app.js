// app.js

const express = require('express');
const app = express();
const port = 3000;

// 서버 시작
app.listen(port, () => {
  console.log(`서버 ON: http://localhost:${port}/`)
})