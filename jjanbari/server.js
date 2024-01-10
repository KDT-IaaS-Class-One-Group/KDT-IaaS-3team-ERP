// server.js

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connection = require('./src/Databases/userInfo');
const { query } = require('./src/Databases/productInfo');

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

// 회원 가입 라우트
app.post('/signup', (req, res) => {
  try {
    const { userID, userPW, userNAME } = req.body;

    // 아이디로 사용자 조회 관련 내용 삭제

    // 사용자 정보 저장
    const insertDataQuery = `
      INSERT INTO users (userID, userPW, userNAME)
      VALUES (?, ?, ?);
    `;

    connection.query(insertDataQuery, [userID, userPW, userNAME], (error, results) => {
      if (error) {
        console.error('회원 가입 실패:', error);
        res.status(500).send('회원 가입에 실패했습니다. 다시 시도해주세요.');
      } else {
        console.log('회원 가입 정보 저장 성공:', req.body);
        res.sendStatus(200);
      }
    });
  } catch (error) {
    console.error('회원 가입 실패:', error);
    res.status(500).send('회원 가입에 실패했습니다. 다시 시도해주세요.');
  }
});

// 로그인 라우트
app.post('/login', async (req, res) => {
  try {
    const { userID, userPW } = req.body;

    // 아이디로 사용자 조회
    connection.query('SELECT * FROM users WHERE userID = ?', [userID], async (error, results) => {
      if (error) {
        console.error('로그인 실패:', error);
        res.status(500).send('로그인에 실패했습니다. 다시 시도해주세요.');
        return;
      }

      if (results.length > 0) {
        const user = results[0];

        // 비밀번호 비교
        if (user.userPW === userPW) {
          if (user.userID === 'adroot') {
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
    });
  } catch (error) {
    console.error('로그인 실패:', error);
    res.status(500).send('로그인에 실패했습니다. 다시 시도해주세요.');
  }
});

//결제시 로그인 정보 확인
app.get('/userInfo', (req, res) => {
  // 추가
  connection.query('SELECT * FROM users', (error, results) => {
    if (error) {
      console.error('사용자 정보 조회 실패:', error);
      res.status(500).send('사용자 정보 조회에 실패했습니다. 다시 시도해주세요.');
    } else {
      res.json(results);
    }
  });
});

// 관리자 페이지 라우트
app.get('/admin', (req, res) => {
  res.send('관리자 페이지입니다.');
});

app.post('/addProducts', async (req, res) => {
  const { name, price, quantity } = req.body;

  try {
    // 먼저 동일한 name과 price를 가진 상품이 있는지 확인합니다.
    const products = await query('SELECT * FROM products WHERE name = ? AND price = ?', [name, price]);

    if (products.length > 0) {
      // 동일한 name과 price를 가진 상품이 이미 있으면, 해당 상품의 quantity를 업데이트합니다.
      await query('UPDATE products SET quantity = quantity + ? WHERE name = ? AND price = ?', [quantity, name, price]);
    } else {
      // 동일한 name과 price를 가진 상품이 없으면, 새로운 상품을 추가합니다.
      await query('INSERT INTO products (name, price, quantity) VALUES (?, ?, ?)', [name, price, quantity]);
    }

    res.json({ success: true });
  } catch (error) {
    console.error('Error during product registration:', error.message);
    res.status(500).json({ success: false, error: '서버 오류가 발생했습니다.' });
  }
});

app.get('/products', async (req, res) => {
  try {
    const products = await query('SELECT * FROM products');
    res.json(products);
  } catch (error) {
    console.error('Error during fetching products:', error.message);
    res.status(500).json({ success: false, error: '서버 오류가 발생했습니다.' });
  }
});

app.put('/products/:name', async (req, res) => {
  const { name } = req.params;
  const { quantity } = req.body;

  try {
    await query('UPDATE products SET quantity = quantity - ? WHERE name = ?', [quantity, name]);
    res.json({ success: true });
  } catch (error) {
    console.error('Error during updating product:', error.message);
    res.status(500).json({ success: false, error: '서버 오류가 발생했습니다.' });
  }
});

app.listen(port, () => {
  console.log(`서버 ON: http://localhost:${port}`);
});
