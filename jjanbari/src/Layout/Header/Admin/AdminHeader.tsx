// src/Component/Header/Admin/AdminHeader.tsx

import "./AdminHeader.css";

const AdminHeader = () => {
  return <div id="adminHeader">
    <a href="/admin">관리자 페이지로</a>
    <a href="/login">로그인 페이지로</a>
    <a href="signup">회원 가입 페이지로</a>
    <a href="mypage">마이 페이지로</a>
    <a href="/">메인 페이지로</a>
  </div>;
};

export default AdminHeader;
