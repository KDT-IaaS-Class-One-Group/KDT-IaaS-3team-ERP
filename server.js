const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const db = require('./public-db/db.js');

const app = express();
const port = 5050;

// body-parser를 사용하여 JSON 데이터 파싱
app.use(bodyParser.json());

// POST 요청 바디 파싱
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// 정적 파일 서빙
app.use(express.static('public-db'));

// db 쿼리를 실행
db.query('select * from userInfo', (err, rows) => {
  // 에러가 있으면 콘솔에 출력합니다.
  if (err) {
    console.error(err);
  }
  // 결과가 있으면 콘솔에 출력합니다.
  if (rows) {
    console.log(rows);
  }
});

// 메인 페이지 라우팅
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public-db/index.html');
});

// 로그인 페이지 라우트 설정
app.get('/login', (req, res) => {
  res.sendFile(__dirname + '/public-db/login.html');
})

// 회원가입 페이지 라우트 설정
app.get('/signUp', (req, res) => {
  res.sendFile(__dirname + '/public-db/sign-up.html');
})

// 장바구니 페이지 라우팅
app.get('/cart', (req, res) => {
  res.sendFile(__dirname + '/publics/cart.html');
});

// 회원가입 요청을 처리하는 라우트
app.post('/signUp/save', (req, res) => {
  // 요청의 바디에서 입력값을 받아온다.
  const userId = req.body.userId;
  const password = req.body.password;
  const userName = req.body.userName;
  // 입력값을 검증하고, db에 저장하고, 쿠키를 생성하는 로직을 작성
  res.json({result: 'success'});
});

// 로그인 요청을 처리하는 라우트를 설정합니다.
app.post('/login-in', (req, res) => {
  const userId = req.body.userId;
  const password = req.body.password;
  // 입력값을 검증하고, db와 비교하고, 쿠키를 생성하는 로직을 작성
  res.json({result: 'success'});
});

// // 데이터 저장 및 읽기
// const dataPath = __dirname + '/publics/data.json';

// function saveData(data) {
//   fs.writeFileSync(dataPath, JSON.stringify(data, null, 2), 'utf-8');
// }

// function loadData() {
//   try {
//     const data = fs.readFileSync(dataPath, 'utf-8');
//     return JSON.parse(data);
//   } catch (error) {
//     return [];
//   }
// }

// // 메인 페이지에서 전송된 데이터 저장
// app.post('/add-to-cart', (req, res) => {
//   const newItem = req.body.item;
//   const cartData = loadData();

//   cartData.push(newItem);
//   saveData(cartData);

//   res.json({ success: true, message: 'Item added to cart successfully' });
// });

// // cart.html에 작성된 data.json 값 삭제
// app.post('/delete-items', (req, res) => {
//   try {
//     const itemsToDelete = req.body.items;
//     const cartData = loadData();
//     console.log('Items to delete:', itemsToDelete);

//     // 체크된 아이템 삭제
//     const updatedData = cartData.filter((item) => !itemsToDelete.includes(item.item)); // item.item 부분은 value가 아닌 json의 key 값을 설정해줘야 한다.

//     saveData(updatedData);

//     // 데이터가 성공적으로 삭제가 되면 아래의 문구가 나타난다.
//     res.json({ success: true, message: 'Selected items deleted successfully' });
//   } catch (error) {
//     console.error('Error:', error);
//     res.status(500).json({ success: false, message: 'Internal Server Error' });
//   }
// });

app.listen(port, () => {
  console.log(`서버가 http://localhost:${port} 포트에서 실행 중입니다.`);
});
