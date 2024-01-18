// test.js

const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();

// body-parser 미들웨어 추가
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MariaDB 연결 설정
const db = mysql.createConnection({
  host: 'forteam3.c9kusawuiwxh.ap-northeast-2.rds.amazonaws.com',
  user: 'root',
  password: 'qwer1234',
  database: 'jjanbariERP',
});

// TEST 테이블 추가
db.query(`CREATE TABLE IF NOT EXISTS TEST (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  age INT,
  email VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`);

// Express 서버 라우트 설정
app.get('/', (req, res) => {
  // MariaDB에서 데이터 가져오기 예제
  db.query('SELECT * FROM TEST', (error, results) => {
    if (error) throw error;

    // 테이블 형태로 결과 콘솔에 출력
    console.table(results);

    // HTML 페이지 렌더링
    const html = `
      <html>
        <head>
          <title>TEST Table Data</title>
        </head>
        <body>
          <h1>TEST Table Data</h1>
          <table border="1">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Age</th>
              <th>Email</th>
              <th>Created At</th>
            </tr>
            ${results.map(row => `
              <tr>
                <td>${row.id}</td>
                <td>${row.name}</td>
                <td>${row.age}</td>
                <td>${row.email}</td>
                <td>${row.created_at}</td>
              </tr>
            `).join('')}
          </table>

          <!-- 데이터 추가 폼 -->
          <h3>프로필 입력 폼</h3>
          <div id="profileFormContainer"></div>  <!-- React로 구성된 컴포넌트를 삽입할 컨테이너 -->
        </body>
        <script src="/static/js/bundle.js"></script>  <!-- React 컴포넌트 번들링된 파일을 추가 -->
      </html>
    `;

    res.send(html);
  });
});

// 프로필을 추가하는 라우트
app.post('/addProfile', (req, res) => {
  const newProfile = {
    name: req.body.name,
    age: req.body.age,
    email: req.body.email,
  };

  db.query('INSERT INTO TEST SET ?', newProfile, (error, result) => {
    if (error) throw error;
    console.log('New data added:', result);
    res.redirect('/'); // 추가 후 다시 홈페이지로 리다이렉트
  });
});

// 서버 실행
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
