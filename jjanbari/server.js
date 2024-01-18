// server.js

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { jjanbariQuery } = require('./src/Database/jjanbariERP');

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
      INSERT INTO users (user_id, user_pw, user_name)
      VALUES (?, ?, ?);
    `;

    await jjanbariQuery(insertDataQuery, [userID, userPW, userNAME]);

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

    const results = await jjanbariQuery('SELECT * FROM users WHERE user_id = ?', [userID]);

    if (results.length > 0) {
      const user = results[0];

      // 비밀번호 비교
      if (user.user_pw === userPW) {
        if (user.user_id === 'adroot') {
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
      const animalCategories = await jjanbariQuery('SELECT * FROM animal_categories');
      const ageCategories = await jjanbariQuery('SELECT * FROM age_categories');
      const functionalCategories = await jjanbariQuery('SELECT * FROM functional_categories');

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
    const existingProducts = await jjanbariQuery('SELECT * FROM products WHERE name = ? AND price = ?', [name, price]);

    if (existingProducts.length > 0) {
      // 동일한 name과 price를 가진 상품이 이미 있으면, 해당 상품의 quantity를 업데이트
      const existingProduct = existingProducts[0];
      await jjanbariQuery('UPDATE products SET quantity = quantity + ? WHERE product_id = ?', [quantity, existingProduct.id]);
    } else {
      // 동일한 name과 price를 가진 상품이 없으면, 새로운 상품을 추가
      const insertProductResult = await jjanbariQuery('INSERT INTO products (name, price, quantity, img, animal_id, age_id, functional_id) VALUES (?, ?, ?, ?, ?, ?, ?)', [name, price, quantity, img, animalCategory, ageCategory, functionalCategory]);

      const productId = insertProductResult.insertId;

      // 각각의 연결 테이블에도 데이터 추가
      await jjanbariQuery('INSERT INTO animal_products (product_id, animal_id) VALUES (?, ?)', [productId, animalCategory]);
      await jjanbariQuery('INSERT INTO age_products (product_id, age_id) VALUES (?, ?)', [productId, ageCategory]);
      await jjanbariQuery('INSERT INTO functional_products (product_id, functional_id) VALUES (?, ?)', [productId, functionalCategory]);

    }

    res.json({ success: true, message: '제품 등록 완료' });
  } catch (error) {
    console.error('Error during product registration:', error.message);
    res.status(500).json({ success: false, error: '서버 오류가 발생했습니다.' });
  }
});

app.get('/products', async (req, res) => {
  try {
    const products = await jjanbariQuery('SELECT product_id, name, price, quantity, img FROM products');
    res.json(products);
  } catch (error) {
    console.error('Error during fetching products:', error.message);
    res.status(500).json({ success: false, error: '서버 오류가 발생했습니다.' });
  }
});

// 서버 코드에 강아지와 고양이 카테고리에 해당하는 상품 가져오는 API 추가
app.get('/products/:category', async (req, res) => {
  const category = req.params.category;
  try {
    let query = 'SELECT products.product_id, products.name, products.price, products.quantity, products.img FROM products ';
    let params = [];
    if (category === 'dog') {
      query += 'INNER JOIN animal_products ON products.product_id = animal_products.product_id WHERE animal_products.animal_id = ?';
      params.push(1); // 예시로 강아지 카테고리 ID를 1로 가정
    } else if (category === 'cat') {
      query += 'INNER JOIN animal_products ON products.product_id = animal_products.product_id WHERE animal_products.animal_id = ?';
      params.push(2); // 예시로 고양이 카테고리 ID를 2로 가정
    }
    const products = await jjanbariQuery(query, params);
    res.json(products);
  } catch (error) {
    console.error('Error during fetching products:', error.message);
    res.status(500).json({ success: false, error: '서버 오류가 발생했습니다.' });
  }
});


// 관리자 페이지 상품 관리
app.get('/admin/products', async (req, res) => {
  try {
    const products = await jjanbariQuery('SELECT * FROM products');
    res.json(products);
  } catch (error) {
    console.error('Error during fetching products:', error.message);
    res.status(500).json({ success: false, error: '서버 오류가 발생했습니다.' });
  }
});

app.put('/products/purchase/:id', async (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body; // 구매할 수량

  try {
    // 상품 정보를 먼저 조회
    const product = await jjanbariQuery('SELECT quantity FROM products WHERE product_id = ?', [id]);
    if (product.length === 0) {
      return res.status(404).json({ success: false, error: '상품을 찾을 수 없습니다.' });
    }

    const currentQuantity = product[0].quantity;
    if (quantity > currentQuantity) {
      return res.status(400).json({ success: false, error: '재고가 부족합니다.' });
    }

    // 상품 수량 업데이트
    await jjanbariQuery('UPDATE products SET quantity = quantity - ? WHERE product_id = ?', [quantity, id]);
    res.json({ success: true, message: '구매가 완료되었습니다.' });
  } catch (error) {
    console.error('Error during purchase:', error.message);
    res.status(500).json({ success: false, error: '구매 처리 중 오류가 발생했습니다.' });
  }
});

app.put('/admin/products/:id', async (req, res) => {
  const { id } = req.params;
  const { name, price, quantity } = req.body;

  try {
    await jjanbariQuery('UPDATE products SET name = ?, price = ?, quantity = ? WHERE product_id = ?', [
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
    await jjanbariQuery('DELETE FROM products WHERE product_id = ?', [id]);
    res.json({ success: true });
  } catch (error) {
    console.error('Error during deleting product:', error.message);
    res.status(500).json({ success: false, error: '서버 오류가 발생했습니다.' });
  }
});

// 관리자 페이지 회원 정보 관리
app.get('/users', async (req, res) => {
  try {
    const userProfiles = await jjanbariQuery('SELECT * FROM users');
    res.json(userProfiles);
  } catch (error) {
    console.error('Error during fetching users:', error.message);
    res.status(500).json({ success: false, error: '서버 오류가 발생했습니다.' });
  }
});

//결제 버튼 클릭시 post 요청으로 구매한 날짜 구매한 상품 보내기

app.post('/payment', async (req, res) => {
  const { productId } = req.body; // 클라이언트로부터 받은 상품 ID

  try {
    // payment 테이블에 기록
    await jjanbariQuery('INSERT INTO payment (sold) VALUES (?)', [productId]);

    res.json({ success: true, message: '결제가 완료되었습니다.' });
  } catch (error) {
    console.error('Error during payment processing:', error.message);
    res.status(500).json({ success: false, error: '결제 처리 중 오류가 발생했습니다.' });
  }
});

app.listen(port, () => {
  console.log(`서버 ON: http://localhost:${port}`);
});
