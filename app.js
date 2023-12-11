const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 8080;

// 정적 파일 제공
app.use(express.static(path.join(__dirname, 'public')));

// POST 요청 바디 파싱
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/postdata', (req, res) => {
  const postData = req.body;

  // a.json 파일을 읽어옴
  const data = JSON.parse(fs.readFileSync('./public/a.json'));

  // 새로운 데이터를 배열에 추가
  data.push(postData);
  
  // a.json 파일에 쓰기
  fs.writeFileSync('./public/a.json', JSON.stringify(data, null, 2));

  // 성공 응답
  res.json({ message: 'Data received and saved successfully!' });
  
  console.log('POST 데이터:', postData);
  res.send('데이터를 서버에서 받았습니다.');
});

app.listen(port, () => {
  console.log(`서버가 http://localhost:${port} 포트에서 실행 중입니다.`)
})