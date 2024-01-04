const express = require('express');
const bodyParser = require('body-parser');
// mysql 모듈을 불러옵니다.
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = 5000;
app.use(cors());

// body-parser를 사용하여 JSON 데이터 파싱
app.use(bodyParser.json());

// POST 요청 바디 파싱
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// db 연결 정보를 설정합니다.
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'qwer123',
  database: 'userInfo'
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
  } else {
    console.log('Connected to database');
  }
});

// 회원가입 요청을 처리하는 라우트
app.post('/signUp/save', (req, res) => {
  // 요청의 바디에서 입력값을 받아온다.
  const {userId, password, userName} = req.body;
  const query = 'INSERT INTO userInfo (userId, password, userName) VALUES (?, ?, ?)';
  // 테이블에 있는 userId, password, userName이 html의 body에 있는 input의 name의 값을
	// 인식을 하여 value 값을 가져와서 database query문에 대입하여 db에 저장이 된다.
  db.query(query, [userId, password, userName], (err, results) => {
    if (err) {
      console.error('Error inserting into database:', err);
      res.status(500).send('Error signing up');
    } else {
      res.status(200).send('Signed up successfully');
    }
  });
});

// 로그인 요청을 처리하는 라우트를 설정합니다.
app.post('/login-in', (req, res) => {
  const { userId, password } = req.body;

  const query = 'SELECT * FROM userInfo WHERE userId = ? AND password = ?';
  db.query(query, [userId, password], (err, results) => {
    console.log('Query results:', results);
    if (err) {
      console.error('Error querying database:', err);
      res.status(500).send('Error logging in');
    } else {
      if (results.length > 0) {
        res.status(200).send('Login successful');
      } else {
        res.status(401).send('Invalid credentials');
      }
    }
  });
});

app.listen(port, () => {
  console.log(`서버가 http://localhost:${port} 포트에서 실행 중입니다.`);
});
