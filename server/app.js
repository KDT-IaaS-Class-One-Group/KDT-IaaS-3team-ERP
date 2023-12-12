const express = require('express');
const app = express();
const port = 3000;
const fs = require('fs');

app.use(express.static('../public'));
app.use(express.json()); // JSON 파싱을 위한 미들웨어 추가
const path= require('path')


app.use(express.static(path.join(__dirname, '../public')));

// JSON 파일에서 데이터를 읽어옴
function readProducts() {
    const rawData = fs.readFileSync('products.json');
    return JSON.parse(rawData);
}

// JSON 파일에 데이터를 저장
function saveProducts(data) {
    const jsonData = JSON.stringify(data, null, 2);
    fs.writeFileSync('products.json', jsonData);
}

app.get('/getProducts', (req, res) => {
    const products = readProducts();
    res.json(products);
});

app.post('/addProduct', (req, res) => {
    const newProduct = req.body;

    // 서버에서 데이터 읽어오기
    const products = readProducts();

    // 새 상품 추가
    products.push(newProduct);

    // 데이터 저장
    saveProducts(products);

    res.send('Product added successfully!');
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
