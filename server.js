const express = require("express");
const app = express();

// 라우팅 설정
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html")
})