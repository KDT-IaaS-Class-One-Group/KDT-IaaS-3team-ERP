// server.ts

import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import { query, addUser } from '../database/db'; // data.ts 파일에서 export한 함수들을 불러옴

const app = express();
const port = 9997;

// 정적 파일 서빙 설정 수정 지금 안되니까 일단 주석
// app.use(
//   express.static(path.join(__dirname, '../../dist'), {
//     mimeTypes: {
//       js: 'application/javascript',
//     },
//   })
// );

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/mainPage.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/loginPage.html'));
});

app.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/signupPage.html'));
});

app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/adminPage.html'));
});

app.post('/signup', async (req, res) => {
  const { id, password, name } = req.body;
  try {
    const result = await addUser(id, password, name);
    res.json({ success: true }); // 성공 시 JSON 형식으로 응답
  } catch (error) {
    console.error('Signup failed:', error.message);
    res.status(400).json({ success: false, error: error.message }); // 실패 시 JSON 형식으로 응답
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
