// test/readJsonFile.js

const fs = require('fs')

// JSON 파일을 읽어오는 함수
function readJsonFile(filePath) {
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('JSON 파일 읽기 실패: ', error.message);
    return null;
  }
}

module.exports = readJsonFile;