const express = require("express");
const app = express();
const fs = require("fs")
const bodyParser = require("body-parser")

// body-parser middleware 사용
app.use(bodyParser.urlencoded({ extended: true}));

// 라우팅 설정
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html")
})

app.get("/admin", (req, res) => {
  res.sendFile(__dirname + "/admin.html")
    // info.json 파일 읽기
    const rawData = fs.readFileSync(__dirname + "/info.json");
    const info = JSON.parse(rawData);
  
    // admin.html 파일 전송
    res.render(__dirname + "/admin.html", { id: info.id, password: info.password });
})

app.post("/login", (req, res) => {
  // 입력받은 데이터 가져오기
  const id = req.body.id;
  const password = req.body.password;

  // 데이터베이스에 저장
  const info = { id, password };
  fs.writeFileSync(__dirname + "/info.json", JSON.stringify(info));

  res.send(info);
  // // 관리자 페이지로 리다이렉트
  // res.redirect("/admin");
});

// 서버 실행
app.listen(9997, () => {
  console.log("http://localhost:9997/")
})