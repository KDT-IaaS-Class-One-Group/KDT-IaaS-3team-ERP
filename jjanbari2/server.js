// server.js

const express = require('express');
const userInfo = require('./src/Databases/userInfo');

const app = express();
const port = 3001;

// 회원 가입 라우트
app.post('/signup', async (req, res) => {
  const { userID, userPW, userNAME } = req.body;

  try {
    // 아이디로 사용자 조회
    const existingUser = await userInfo.getUserById(userID);

    if (existingUser) {
      console.error('회원 가입 실패: 이미 존재하는 아이디입니다.');
      res.status(409).send('이미 존재하는 아이디입니다.');
    } else {
      // 사용자 정보 저장
      const insertDataQuery = `
        INSERT INTO users (id, password, name)
        VALUES (?, ?, ?);
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
    }
  } catch (error) {
    console.error('회원 가입 실패:', error);
    res.status(500).send('회원 가입에 실패했습니다. 다시 시도해주세요.');
  }
});
app.listen(port, () => {
  console.log(`서버 ON: http://localhost:${port}`);
});
