// test/app.js

const readJsonFile = require('./readJsonFile');
const renderToHtml = require('./renderToHtml');

// JSON 파일 경로
const jsonFilePath = './greenAcademy_classrooms.json';

// JSON 파일을 읽어오는 함수를 호출
const jsonData = readJsonFile(jsonFilePath);

if (jsonData) {
  // HTML로 렌더링하는 함수를 호출
  const renderedHtml = renderToHtml(jsonData);

  // 렌더링된 HTML을 콘솔에 출력
  console.log(renderedHtml);
}