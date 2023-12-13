// routes/route.js

const express = require('express');
const path = require('path');
const fs = require('fs/promises'); // 파일 시스템 모듈 사용
const router = express.Router();

const productFilePath = path.join(__dirname, '../public/product.json');

// 관리자 페이지
router.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/admin.html'));
});
// 상품 목록 가져오기 API
router.get('/api/products', async (req, res) => {
  try {
    // product.json을 불러와 상품 목록을 가져옴
    const data = await fs.readFile(productFilePath, 'utf-8');
    const products = JSON.parse(data);
    res.json(products);
  } catch (error) {
    console.error('상품 목록 가져오기 중 오류 발생:', error);
    res.status(500).json({ error: '서버 오류' });
  }
});

// 상품 등록 API
router.post('/api/products', express.json(), async (req, res) => {
  const { product } = req.body;

  if (!product) {
    return res.status(400).json({ error: '상품을 입력하세요.' });
  }

  try {
    // product.json 파일을 불러와 상품 목록을 가져옴
    const data = await fs.readFile(productFilePath, 'utf-8');
    const products = JSON.parse(data);

    // 새로운 상품을 상품 목록에 추가
    products.push({ name: product });

    // product.json 파일을 업데이트해 새로운 상품을 추가함
    await fs.writeFile(productFilePath, JSON.stringify(products, null, 2), 'utf-8');
    
    // 상품 등록이 성공적인지 응답을 전송
    res.json({ success: true });
  } catch (error) {
    console.error('상품 등록 중 오류 발생:', error);
    res.status(500).json({ error: '서버 오류' });
  }
});

// 사용자 페이지
router.get('/user', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/user.html'));
});

// 로그인 페이지
router.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/login.html'));
});
// post 처리를 통해 초기 페이지 서빙
router.post('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'))
} )

// 상품 페이지
router.get('/product', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/product.html'));
});

// 회원가입 페이지
router.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/signup.html'));
});
// 회원가입 폼 처리
router.post('/signup', express.urlencoded({ extended: true }), async (req, res) => {
  // 클라이언트에서 전송한 폼 데이터를 req.body에서 추출
  const { name, id, pw } = req.body;

  // 모든 필드가 제대로 입력되었는지 확인
  if (!name || !id || !pw) {
    // 필드 중 하나라도 누락된 것이 있다면 클라이언트에게 오류 응답 전송
    return res.status(400).json({ error: '모든 필드를 입력하세요.' });
  }

  try {
    // 기존 유저 정보 로드
    const userInfoPath = path.join(__dirname, '../public/userInfo.json');
    const data = await fs.readFile(userInfoPath, 'utf-8');
    const existingUsers = JSON.parse(data);

    // 새로운 유저 정보 추가
    const newUser = { name, id, pw };
    existingUsers.push(newUser);

    // 정보를 파일에 저장
    await fs.writeFile(userInfoPath, JSON.stringify(existingUsers, null, 2), 'utf-8');

    // 회원가입이 성공적으로 완료되었음을 클라이언트에게 응답
    res.json({ success: true });
  } catch (error) {
    console.error('회원가입 중 오류 발생:', error);
    res.status(500).json({ error: '서버 오류' });
  }
});


module.exports = router;