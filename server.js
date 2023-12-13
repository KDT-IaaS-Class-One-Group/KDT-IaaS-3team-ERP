const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const port = 5050;

// body-parser를 사용하여 JSON 데이터 파싱
app.use(bodyParser.json());

// 정적 파일 서빙
app.use(express.static('publics'));

// 메인 페이지 라우팅
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/publics/main.html');
});

// 장바구니 페이지 라우팅
app.get('/cart', (req, res) => {
  res.sendFile(__dirname + '/publics/cart.html');
})

// 데이터 저장 및 읽기
const dataPath = __dirname + '/publics/data.json';

function saveData(data) {
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2), 'utf-8');
}

function loadData() {
  try {
    const data = fs.readFileSync(dataPath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

// 메인 페이지에서 전송된 데이터 저장
app.post('/add-to-cart', (req, res) => {
  const newItem = req.body.item;
  const cartData = loadData();

  cartData.push(newItem);
  saveData(cartData);

  res.json({ success: true, message: 'Item added to cart successfully' });
});

app.listen(port, () => {
  console.log(`서버가 http://localhost:${port} 포트에서 실행 중입니다.`)
})