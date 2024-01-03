// server/server.js

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const userInfoDB = require('../Databases/userInfoDB');
const productInfoDB = require('../Databases/productInfoDB');

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

// 회원 가입 라우트
app.post('/signup', async (req, res) => {
  const { id, password, name } = req.body;

  try {
    // 아이디로 사용자 조회
    const existingUser = await userInfoDB.getUserById(id);

    if (existingUser) {
      console.error('회원 가입 실패: 이미 존재하는 아이디입니다.');
      res.status(409).send('이미 존재하는 아이디입니다.');
    } else {
      // 사용자 정보 저장
      const insertDataQuery = `
        INSERT INTO userInfo (id, password, name)
        VALUES (?, ?, ?);
      `;

      userInfoDB.connection.query(insertDataQuery, [id, password, name], (error, results) => {
        if (error) {
          console.error('회원 가입 실패:', error);
          res.status(500).send('회원 가입에 실패했습니다. 다시 시도해주세요.');
        } else {
          console.log('회원 가입 정보 저장 성공:', req.body);
          res.sendStatus(200);
        }
      });
    }
  } catch (error) {
    console.error('회원 가입 실패:', error);
    res.status(500).send('회원 가입에 실패했습니다. 다시 시도해주세요.');
  }
});

// 로그인 라우트
app.post('/login', async (req, res) => {
  const { id, password } = req.body;

  try {
    // 아이디로 사용자 조회
    const user = await userInfoDB.getUserById(id);

    if (user) {
      // 비밀번호 비교
      if (user.password === password) {
        if (user.id === 'adroot') {
          // 관리자 로그인 성공
          console.log('관리자로 로그인하였습니다.');
          res.status(201).json({ role: 'admin' });
        } else {
          // 사용자 로그인 성공
          console.log('사용자로 로그인하였습니다.');
          res.status(200).json({ role: 'user' });
        }
      } else {
        console.error('로그인 실패: 비밀번호가 일치하지 않습니다.');
        res.status(401).send('비밀번호가 일치하지 않습니다.');
      }
    } else {
      console.error('로그인 실패: 해당 ID가 존재하지 않습니다.');
      res.status(401).send('해당 ID가 존재하지 않습니다.');
    }
  } catch (error) {
    console.error('로그인 실패:', error);
    res.status(500).send('로그인에 실패했습니다. 다시 시도해주세요.');
  }
});

// 관리자 페이지 라우트
app.get('/admin', (req, res) => {
  res.send('관리자 페이지입니다.');
});

// 상품 등록 라우트
app.post('/add-product', async (req, res) => {
  const { name, price, quantity } = req.body;

  try {
    // 상품 정보 저장
    const insertDataQuery = `
      INSERT INTO productInfo (name, price, quantity)
      VALUES (?, ?, ?);
    `;

    productInfoDB.connection.query(insertDataQuery, [name, price, quantity], (error, results) => {
      if (error) {
        console.error('상품 등록 실패:', error);
        res.status(500).send('상품 등록에 실패했습니다. 다시 시도해주세요.');
      } else {
        console.log('상품 등록 정보 저장 성공:', req.body);
        res.sendStatus(200);
      }
    });
  } catch (error) {
    console.error('상품 등록 실패:', error);
    res.status(500).send('상품 등록에 실패했습니다. 다시 시도해주세요.');
  }
});


// 사용자 페이지 라우트
app.get('/main', (req, res) => {
  res.send('사용자 페이지입니다.');
});

app.listen(port, () => {
  console.log(`서버 ON: http://localhost:${port}`);
});
