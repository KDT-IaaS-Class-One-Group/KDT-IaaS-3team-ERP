// utils/session.js

const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const { Sequelize, DataTypes } = require('sequelize');

// Sequelize 연결 설정
const sequelize = new Sequelize({
  dialect: 'mysql',
  host: 'localhost',
  username: 'root',
  password: '1234',
  database: 'userInfoDB',
});

// Sequelize 모델 정의
const Session = sequelize.define('Session', {
  sid: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  expires: {
    type: DataTypes.DATE,
  },
  data: {
    type: DataTypes.TEXT,
  },
});

// 세션 데이터베이스 설정
const sessionStore = new SequelizeStore({
  db: sequelize,
  table: 'Session',
  checkExpirationInterval: 15 * 60 * 1000, // 15 minutes
  expiration: 24 * 60 * 60 * 1000, // 1 day
});

const initSession = (app) => {
  app.use(
    session({
      secret: 'your-secret-key',
      resave: false,
      saveUninitialized: true,
      store: sessionStore,
    })
  );

  // 세션 데이터베이스 동기화
  sequelize.sync().then(() => {
    console.log('세션 데이터베이스 동기화 완료');
  });
};

module.exports = { initSession, sessionStore };
