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

app.post('/login', async (req, res) => {
  const { id, password } = req.body;

  try {
    // Check if the user with the provided id and password exists
    const users = await query('SELECT * FROM userInfo WHERE id = ? AND password = ?', [id, password]);
    if (users.length > 0) {
      // 로그인 성공
      res.json({ success: true });
    } else {
      // 로그인 실패
      res.status(401).json({ success: false, error: '아이디 또는 비밀번호가 일치하지 않습니다.' });
    }
  } catch (error) {
    console.error('Error during login:', error.message);
    res.status(500).json({ success: false, error: '서버 오류가 발생했습니다.' });
  }
});

app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/adminPage.html'));
});

// 상품 등록 엔드포인트 추가
app.post('/addProduct', async (req, res) => {
  const { productName, productPrice, productQuantity } = req.body;

  try {
    const sql = 'INSERT INTO products (name, price, quantity) VALUES (?, ?, ?)';
    await query(sql, [productName, productPrice, productQuantity]);

    res.json({ success: true });
  } catch (error) {
    console.error('Error adding product:', error.message);
    res.status(400).json({ success: false, error: error.message });
  }
});

app.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/signupPage.html'));
});

app.post('/signup', async (req, res) => {
  const { id, password, name } = req.body;
  try {
    const existingUsers = await query('SELECT * FROM userInfo WHERE id = ?', [id]);

    if (existingUsers.length > 0) {
      res.json({ success: false, error: '이미 등록된 ID입니다.' });
    } else {
      await addUser(id, password, name);
      res.json({ success: true });
    }
  } catch (error) {
    console.error('Signup failed:', error.message);
    res.status(400).json({ success: false, error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
