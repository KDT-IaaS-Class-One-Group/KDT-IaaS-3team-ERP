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

// 추가: 카테고리 이름으로부터 id를 가져오는 함수
const getCategoryId = async (tableName, categoryName) => {
  let columnName;
  switch (tableName) {
    case 'animal_categories':
      columnName = 'animal_id';
      break;
    case 'age_categories':
      columnName = 'age_id';
      break;
    case 'functional_categories':
      columnName = 'functional_id';
      break;
    // 다른 카테고리 테이블들도 필요에 따라 추가하세요.
    default:
      throw new Error(`Unsupported table name: ${tableName}`);
  }

  const query = `SELECT ${columnName} FROM ${tableName} WHERE ${tableName}_name = ?`;
  const result = await productQuery(query, [categoryName]);
  return result[0][columnName];
};

//이미지 저장
app.post('/addProductWithImage', upload.single('image'), async (req, res) => {
  const { name, price, quantity, animalCategory, ageCategory, functionalCategory } = req.body;
  const img = req.file ? req.file.path : null;

  // 카테고리 정보를 연결 테이블에 추가
  const animalCategoryId = await getCategoryId('animal_categories', animalCategory);
  const ageCategoryId = await getCategoryId('age_categories', ageCategory);
  const functionalCategoryId = await getCategoryId('functional_categories', functionalCategory);

  console.log('name:', name);
  console.log('price:', price);
  console.log('quantity:', quantity);
  console.log('animalCategory:', animalCategory);
  console.log('ageCategory:', ageCategory);
  console.log('functionalCategory:', functionalCategory);
  console.log('img:', img);

  try {
    // 동일한 name과 price를 가진 상품이 있는지 확인
    const existingProducts = await productQuery('SELECT * FROM products WHERE name = ? AND price = ?', [name, price]);

    if (existingProducts.length > 0) {
      // 동일한 name과 price를 가진 상품이 이미 있으면, 해당 상품의 quantity를 업데이트
      const existingProduct = existingProducts[0];
      await productQuery('UPDATE products SET quantity = quantity + ? WHERE product_id = ?', [
        quantity,
        existingProduct.id,
      ]);
    } else {
      // 동일한 name과 price를 가진 상품이 없으면, 새로운 상품을 추가
      const result = await productQuery(
        'INSERT INTO products (name, price, quantity, img, animal_id, age_id, functional_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [name, price, quantity, img, animalCategoryId, ageCategoryId, functionalCategoryId]
      );

      // 새로 등록된 상품의 ID를 가져옴
      const newProductId = result.insertId;

      // 동물 종류-상품 연결
      await productQuery('INSERT INTO animal_products (product_id, animal_id) VALUES (?, ?)', [
        newProductId,
        animalCategoryId.id || null,
      ]);

      // 나이대-상품 연결
      await productQuery('INSERT INTO age_products (product_id, age_id) VALUES (?, ?)', [
        newProductId,
        ageCategoryId.id || null,
      ]);

      // 기능성-상품 연결
      await productQuery('INSERT INTO functional_products (product_id, functional_id) VALUES (?, ?)', [
        newProductId,
        functionalCategoryId.id || null,
      ]);
    }

    res.json({ success: true, message: '제품 등록 완료' });
  } catch (error) {
    console.error('Error during product registration:', error.message);
    res.status(500).json({ success: false, error: '서버 오류가 발생했습니다.' });
  }
});

// 예시: Express.js를 사용하여 동물 종류, 나이대, 기능성 카테고리 데이터를 클라이언트에 제공하는 라우트
app.get('/categories', async (req, res) => {
  try {
    const animalCategories = await productQuery('SELECT * FROM animal_categories');
    const ageCategories = await productQuery('SELECT * FROM age_categories');
    const functionalCategories = await productQuery('SELECT * FROM functional_categories');

    res.status(200).json({
      animalCategories: animalCategories,
      ageCategories: ageCategories,
      functionalCategories: functionalCategories,
    });
  } catch (error) {
    console.error('카테고리 데이터를 불러오는 중 에러 발생:', error);
    res.status(500).json({ error: '카테고리 데이터를 불러오는 중 에러가 발생했습니다.' });
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
  const { product_id } = req.params;
  const { name, price, quantity } = req.body;

  try {
    await productQuery('UPDATE products SET name = ?, price = ?, quantity = ? WHERE product_id = ?', [
      name,
      price,
      quantity,
      product_id,
    ]);
    res.json({ success: true });
  } catch (error) {
    console.error('Error during updating product:', error.message);
    res.status(500).json({ success: false, error: '서버 오류가 발생했습니다.' });
  }
});

app.delete('/admin/products/:id', async (req, res) => {
  const { product_id } = req.params;

  try {
    await productQuery('DELETE FROM products WHERE id = ?', [product_id]);
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

// API 엔드포인트: 동물 카테고리 정보 가져오기
app.get('/animalCategories', async (req, res) => {
  try {
    const animal = await productQuery('SELECT * FROM animal_categories');
    res.json(animal);
  } catch (error) {
    console.error('동물 카테고리 정보를 가져오는 중 에러 발생:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// API 엔드포인트: 나이 카테고리 정보 가져오기
app.get('/ageCategories', async (req, res) => {
  try {
    const age = await productQuery('SELECT * FROM age_categories');
    res.json(age);
  } catch (error) {
    console.error('나이 카테고리 정보를 가져오는 중 에러 발생:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// API 엔드포인트: 기능 카테고리 정보 가져오기
app.get('/functionalCategories', async (req, res) => {
  try {
    const functional = await productQuery('SELECT * FROM functional_categories');
    res.json(functional);
  } catch (error) {
    console.error('기능 카테고리 정보를 가져오는 중 에러 발생:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`서버 ON: http://localhost:${port}`);
});
