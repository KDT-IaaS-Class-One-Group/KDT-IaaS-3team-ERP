// src/Component/Header/Header.tsx

import "./Header.css";

const Header = () => {
  return (
    <div id="header">
      <a href="http://localhost:3000/admin">관리자 페이지로</a>
      <a href="http://localhost:3000/login">로그인 페이지로</a>
      <a href="http://localhost:3000/signup">회원 가입 페이지로</a>
      <a href="http://localhost:3000/withdraw">회원 탈퇴 페이지로</a>
      <a href="http://localhost:3000/">메인 페이지로</a>
    </div>
  );
};

export default Header;
