const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { query } = require('./src/database/db');
const port = 3000;

const app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, './build')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './build/index.html'));
});

// 로그인 페이지 라우팅

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, './build/index.html'));
});

// 로그인 페이지 로그인 userInfo DB 비교

app.post('/login', async (req, res) => {
  const { id, password } = req.body;

  try {
    const users = await query('SELECT * FROM userInfo WHERE id = ? AND password = ?', [id, password]);
    if (users.length > 0) {
      res.json({ success: true });
    } else {
      res.status(401).json({ success: false, error: 'ID를 확인해주세요' });
    }
  } catch (error) {
    console.error('Error during login:', error.message);
    res.status(500).json({ success: false, error: '서버 오류가 발생했습니다.' });
  }
});

//회원가입페이지 라우팅
app.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, './build/index.html'));
});

// 회원가입 정보 저장
app.post('/signup', async (req, res) => {
  const { id, password, name } = req.body;

  try {
    const users = await query('SELECT * FROM userInfo WHERE id = ?', [id]);
    if (users.length > 0) {
      res.status(409).json({ success: false, error: '이미 등록된 ID입니다' });
    } else {
      await query('INSERT INTO userInfo (id, password, name) VALUES (?, ?, ?)', [id, password, name]);
      res.json({ success: true });
    }
  } catch (error) {
    console.error('Error during signup:', error.message);
    res.status(500).json({ success: false, error: '서버 오류가 발생했습니다.' });
  }
});

app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, './build/index.html'));
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

app.listen(3000, () => {
  console.log(`http://localhost:${port}`);
});
