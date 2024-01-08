// src/Component/Header/Header.tsx

import "./UserHeader.css";

const UserHeader = () => {
  return <div id="userHeader">
    <a href="/admin">관리자 페이지로</a>
    <a href="/login">로그인 페이지로</a>
    <a href="signup">회원 가입 페이지로</a>
    <a href="withdraw">회원 탈퇴 페이지로</a>
    <a href="/">메인 페이지로</a>
  </div>;
};

export default UserHeader;
