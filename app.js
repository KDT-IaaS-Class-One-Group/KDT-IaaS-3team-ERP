const express = require('express');
const path = require('path')
const route = require('./routes/route')

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', route);

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
})