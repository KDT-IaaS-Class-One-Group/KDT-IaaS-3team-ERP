const fs = require('fs');

const jsonFilePath = './data.json'
const jsonData = fs.readFileSync(jsonFilePath, 'utf-8');

const jsonObject =JSON.parse(jsonData);
console.log(jsonObject);