// test.js

document.addEventListener('DOMContentLoaded', function () {
  // 관리자 페이지로 이동
  document.querySelector('.admin').addEventListener('click', function () {
    navigateTo('/admin');
  });

  // 사용자 페이지로 이동
  document.querySelector('.user').addEventListener('click', function () {
    navigateTo('/user');
  });

  // 상품 페이지로 이동
  document.querySelector('.product').addEventListener('click', function () {
    navigateTo('/product');
  });

  // 회원 가입 페이지로 이동
  document.querySelector('.signup').addEventListener('click', function () {
    navigateTo('/signup');
  });

  // 페이지 이동 함수
  function navigateTo(path) {
    // 현재 호스트 주소를 가져와서 URL을 완성
    const url = `http://localhost:3000${path}`;
    // 페이지 이동
    window.location.href = url;
  }
});
