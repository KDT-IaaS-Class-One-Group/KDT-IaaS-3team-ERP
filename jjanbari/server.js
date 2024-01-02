const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { query } = require('./src/database/db');

const app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, './build')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../build/index.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '../build/index.html'));
});

app.post('/login', async (req, res) => {
  const { id, password } = req.body;

  try {
    const users = await query('SELECT * FROM userInfo WHERE id = ? AND password = ?', [id, password]);
    if (users.length > 0) {
      res.json({ success: true });
    } else {
      res.status(401).json({ success: false, error: 'ID를 확인해주세요' });
    }
  } catch (error) {
    console.error('Error during login:', error.message);
    res.status(500).json({ success: false, error: '서버 오류가 발생했습니다.' });
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
