const fs = require('fs');

const rawData = fs.readFileSync('test.json');
const data = JSON.parse(rawData);
