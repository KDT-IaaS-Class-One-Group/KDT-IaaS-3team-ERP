// server.js

const express = require('express');
const userInfo = require('./src/Databases/userInfo');

const app = express();
const port = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 회원 가입 라우트
app.post('/signup', async (req, res) => {
  try {
    const { userID, userPW, userNAME } = req.body;

    // 사용자 정보 저장 전에 유효성 검사
    if (!userID || !userPW || !userNAME) {
      console.error('회원 가입 실패: 필수 정보가 누락되었습니다.');
      res.status(400).send('필수 정보가 누락되었습니다.');
      return;
    }

    // 사용자 정보 저장
    const insertDataQuery = `
    INSERT INTO users (username, password, name)
    VALUES (${userID}, ${userPW}, ${userNAME});
    `;

    userInfo.connection.query(insertDataQuery, [userID, userPW, userNAME], (error, results) => {
      if (error) {
        console.error('회원 가입 실패:', error);
        res.status(500).send('회원 가입에 실패했습니다. 다시 시도해주세요.');
      } else {
        console.log('회원 가입 정보 저장 성공:', req.body);
        res.sendStatus(200);
      }
    });
  } catch (error) {
    console.error('회원 가입 실패:', error);
    res.status(500).send('회원 가입에 실패했습니다. 다시 시도해주세요.');
  }
});

app.listen(port, () => {
  console.log(`서버 ON: http://localhost:${port}`);
});
