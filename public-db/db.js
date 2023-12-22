// mysql 모듈을 불러옵니다.
const mysql = require('mysql');
// db 연결 정보를 설정합니다.
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'qwer123',
  database: 'userInfo'
});

// db 연결을 합니다.
db.connect();
// db 객체를 내보냅니다.
module.exports = db;