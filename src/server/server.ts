import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';

const app = express();
const port = 9997;

// 정적 파일 서빙 설정 수정
app.use(
  express.static(path.join(__dirname, '../../dist'), {
    setHeaders: (res, path, stat) => {
      if (path.endsWith('.js')) {
        res.setHeader('Content-Type', 'application/javascript');
      }
    },
  })
);

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/mainPage.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/loginPage.html'));
});

app.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/signupPage.html'));
});

app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/adminPage.html'));
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
