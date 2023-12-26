import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';

const app = express();
const port = 9997;

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/mainPage.html'));
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
