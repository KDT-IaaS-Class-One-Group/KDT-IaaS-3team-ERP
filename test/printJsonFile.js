// test/printJsonFile.js

// JSON 데이터를 콘솔에 출력하는 함수
function printJsonFile(data) {
  // JSON 객체의 내용을 문자열로 변환하여 콘솔에 출력
  console.log(JSON.stringify(data, null, 2));
}

module.exports = printJsonFile;
