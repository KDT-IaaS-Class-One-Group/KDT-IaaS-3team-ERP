// Importing modules 
const express = require('express');
const bodyParser = require("body-parser");
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(cors);
app.use(bodyParser.json());

// Connect MariaDB
const connection = mysql.createConnection({
  host: 'localhost',
  port: '3338',
  user: 'root',
  password: '1234',
  database: 'userInfo'
})

connection.connect((err) => {
  if (err) {
    console.error('MariaDB connection failed')
  } else{
    console.log('Connected to MariaDB as id' + connection.threadId);
  }
});

// query execute
connection.query('CREATE DATABASE IF NOT EXISTS userInfo', (err) => {
  if (err) throw err;
  // use database
  connection.query('USE userInfo', (err) => {
    if (err) throw err;
    // table create
    connection.query(`CREATE TABLE IF NOT EXISTS users ( id INT AUTO_INCREMENT PRIMARY KEY, userID VARCHAR(255) NOT NULL, userPW VARCHAR(255) NOT NULL, userNAME VARCHAR(255) NOT NULL);`, (err) => {
      if (err) throw err;
      console.log('CREATE DATABASE && TABLE complete')
    })

  })
})

app.post("/signup", async (req, res) => {
  const { userID, userPW, userNAME } = req.body;

  try {
    const result = await connection.query(
      'INSERT INTO users (userID, userPW, userNAME) VALUES (?, ?, ?)',
      [userID, userPW, userNAME]
    );

    console.log('회원 가입 성공', result);
    res.status(200).json({ success: true});
  } catch (error) {
    console.error('회원 가입 실패', error);
    res.status(500).json({ success: false, error: '서버 에러'});
  }
});

app.listen(port, () => {
  console.log(`서버 ON: http://localhost:${port}`);
});