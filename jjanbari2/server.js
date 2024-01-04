// server.js

const express = require('express');
const userInfo = require('./src/Databases/userInfo');

const app = express();
const port = 3001;

app.use(express.json()); // 내장된 body-parser 사용

// 회원 가입 라우트
app.post('/signup', async (req, res) => {
  try {
    const { userID, userPW, userNAME } = req.body;

    console.log('Received signup request:', { userID, userPW, userNAME }); // 새로운 로그 추가

    // 아이디로 사용자 조회
    const existingUser = await userInfo.getUserByUsername(userID);

    if (existingUser) {
      console.error('회원 가입 실패: 이미 존재하는 아이디입니다.');
      res.status(409).send('이미 존재하는 아이디입니다.');
    } else {
      // 사용자 정보 저장
      const insertDataQuery = `
        INSERT INTO users (username, password, name)
        VALUES (?, ?, ?);
      `;

      userInfo.query(insertDataQuery, [userID, userPW, userNAME], (error, results) => {
        if (error) {
          console.error('회원 가입 실패:', error);
          res.status(500).send('회원 가입에 실패했습니다. 다시 시도해주세요.');
        } else {
          console.log('회원 가입 정보 저장 성공:', { userID, userPW, userNAME });
          res.sendStatus(200);
        }
      });
    }
  } catch (error) {
    console.error('회원 가입 실패:', error);
    res.status(500).send('회원 가입에 실패했습니다. 다시 시도해주세요.');
  }
});

app.listen(port, () => {
  console.log(`서버 ON: http://localhost:${port}`);
});
