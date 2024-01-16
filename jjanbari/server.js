// server.js

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { userQuery } = require('./src/Databases/userInfo');
const { productQuery } = require('./src/Databases/productInfo');

//이미지 업로드를 위해 multer를 추가함
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

// 회원 가입 라우트
app.post('/signup', async (req, res) => {
  try {
    const { userID, userPW, userNAME } = req.body;

    const insertDataQuery = `
      INSERT INTO users (userID, userPW, userNAME)
      VALUES (?, ?, ?);
    `;

    await userQuery(insertDataQuery, [userID, userPW, userNAME]);

    console.log('회원 가입 정보 저장 성공:', req.body);
    res.sendStatus(200);
  } catch (error) {
    console.error('회원 가입 실패:', error);
    res.status(500).send('회원 가입에 실패했습니다. 다시 시도해주세요.');
  }
});

// 로그인 라우트
app.post('/login', async (req, res) => {
  try {
    const { userID, userPW } = req.body;

    const results = await userQuery('SELECT * FROM users WHERE userID = ?', [userID]);

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
  } catch (error) {
    console.error('로그인 실패:', error);
    res.status(500).send('로그인에 실패했습니다. 다시 시도해주세요.');
  }
});

app.use('/uploads', express.static('uploads'));

// 서버 코드에 카테고리 목록을 가져오는 API 추가
app.get('/categories', async (req, res) => {
  try {
      const animalCategories = await productQuery('SELECT * FROM animal_categories');
      const ageCategories = await productQuery('SELECT * FROM age_categories');
      const functionalCategories = await productQuery('SELECT * FROM functional_categories');

      res.json({
          animalCategories,
          ageCategories,
          functionalCategories,
      });
  } catch (error) {
      console.error('Error during fetching categories:', error.message);
      res.status(500).json({ success: false, error: '서버 오류가 발생했습니다.' });
  }
});

//이미지 저장
app.post('/addProductWithImage', upload.single('image'), async (req, res) => {
  const { name, price, quantity, animalCategory, ageCategory, functionalCategory } = req.body;
  const img = req.file ? req.file.path : null;

  try {
    // 동일한 name과 price를 가진 상품이 있는지 확인
    const existingProducts = await productQuery('SELECT * FROM products WHERE name = ? AND price = ?', [name, price]);

    if (existingProducts.length > 0) {
      // 동일한 name과 price를 가진 상품이 이미 있으면, 해당 상품의 quantity를 업데이트
      const existingProduct = existingProducts[0];
      await productQuery('UPDATE products SET quantity = quantity + ? WHERE product_id = ?', [quantity, existingProduct.id]);
    } else {
      // 동일한 name과 price를 가진 상품이 없으면, 새로운 상품을 추가
      const insertProductResult = await productQuery('INSERT INTO products (name, price, quantity, img, animal_id, age_id, functional_id) VALUES (?, ?, ?, ?, ?, ?, ?)', [name, price, quantity, img, animalCategory, ageCategory, functionalCategory]);

      const productId = insertProductResult.insertId;

      // 각각의 연결 테이블에도 데이터 추가
      await productQuery('INSERT INTO animal_products (product_id, animal_id) VALUES (?, ?)', [productId, animalCategory]);
      await productQuery('INSERT INTO age_products (product_id, age_id) VALUES (?, ?)', [productId, ageCategory]);
      await productQuery('INSERT INTO functional_products (product_id, functional_id) VALUES (?, ?)', [productId, functionalCategory]);

    }

    res.json({ success: true, message: '제품 등록 완료' });
  } catch (error) {
    console.error('Error during product registration:', error.message);
    res.status(500).json({ success: false, error: '서버 오류가 발생했습니다.' });
  }
});

app.get('/products', async (req, res) => {
  try {
    const products = await productQuery('SELECT product_id, name, price, quantity, img FROM products');
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
    await productQuery('UPDATE products SET quantity = quantity - ? WHERE name = ?', [quantity, name]);
    res.json({ success: true });
  } catch (error) {
    console.error('Error during updating product:', error.message);
    res.status(500).json({ success: false, error: '서버 오류가 발생했습니다.' });
  }
});

// 관리자 페이지 상품 관리
app.get('/admin/products', async (req, res) => {
  try {
    const products = await productQuery('SELECT * FROM products');
    res.json(products);
  } catch (error) {
    console.error('Error during fetching products:', error.message);
    res.status(500).json({ success: false, error: '서버 오류가 발생했습니다.' });
  }
});

app.put('/admin/products/:id', async (req, res) => {
  const { id } = req.params;
  const { name, price, quantity } = req.body;

  try {
    await productQuery('UPDATE products SET name = ?, price = ?, quantity = ? WHERE product_id = ?', [
      name,
      price,
      quantity,
      id,
    ]);
    res.json({ success: true });
  } catch (error) {
    console.error('Error during updating product:', error.message);
    res.status(500).json({ success: false, error: '서버 오류가 발생했습니다.' });
  }
});

app.delete('/admin/products/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await productQuery('DELETE FROM products WHERE product_id = ?', [id]);
    res.json({ success: true });
  } catch (error) {
    console.error('Error during deleting product:', error.message);
    res.status(500).json({ success: false, error: '서버 오류가 발생했습니다.' });
  }
});

// 관리자 페이지 회원 정보 관리
app.get('/users', async (req, res) => {
  try {
    const userProfiles = await userQuery('SELECT * FROM users');
    res.json(userProfiles);
  } catch (error) {
    console.error('Error during fetching users:', error.message);
    res.status(500).json({ success: false, error: '서버 오류가 발생했습니다.' });
  }
});

app.listen(port, () => {
  console.log(`서버 ON: http://localhost:${port}`);
});
