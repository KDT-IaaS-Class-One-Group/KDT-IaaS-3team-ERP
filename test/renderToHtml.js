// test/renderToHtml.js

// HTML로 렌더링하는 함수
function renderToHtml(data) {
  // JSON 객체의 내용을 문자열로 변환하여 표시
  const contentToDisplay = `<p>${JSON.stringify(data, null, 2)}</p>`;

  const renderedHtml = `<div>${contentToDisplay}</div>`;
  return renderedHtml;
}

module.exports = renderToHtml;
