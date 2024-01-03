const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Sequelize, DataTypes} = require('sequelize');

const app = express();
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Sequelize와 MariaDB 연결 설정
const sequelize = new Sequelize('userInfo', 'root', 'qwer123', {
  host: 'localhost',
  dialect: 'mariadb'
});

// 모델 정의 (예: User 모델)
const User = sequelize.define('User', {
  userId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userName: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {
  tableName: 'userInfo',
  timestamps: false,
});

// 테이블 생성
User.sync()
  .then(() => {
    console.log('MariaDB 연결 성공');
  })
  .catch(err => {
    console.error('MariaDB 연결 실패:', err);
  });

// 로그인 API 예제
app.post('/login-in', async (req, res) => {  
  try {
    const { userId, password } = req.body;
    const user = await User.findOne({
      where: {
        userId,
      }
    });

    if (user === password) {
      res.json({ success: true, message: '로그인 성공' });
    } else {
      res.json({ success: false, message: '로그인 실패' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: '서버 에러' });
  }
});

// 회원가입 API 예제
app.post('/signUp/save', async (req, res) => { 
  try {
    const { userId, userName, password } = req.body;
    const newUser = await User.create({
      userId,
      userName,
      password
    });

    res.json({ success: true, message: '회원가입 성공' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: '서버 에러' });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`서버 실행 중: http://localhost:${PORT}`);
});
