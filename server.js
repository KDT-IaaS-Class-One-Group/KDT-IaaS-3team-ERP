const express = require("express");
const app = express();
const fs = require("fs")

// 라우팅 설정
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html")
})

app.post("/login", (req, res) => {
  // 입력받은 데이터 가져오기
  const id = req.body.id;
  const password = req.body.password;

  // 데이터베이스에 저장
  const info = { id, password };
  fs.writeFileSync(__dirname + "/info.json", JSON.stringify(info));
})