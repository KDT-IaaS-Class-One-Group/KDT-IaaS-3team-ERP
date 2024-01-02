// src/Component/Header/Header.tsx

import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  return (
    <div id="header">
      <Link to="/admin">관리자 페이지로</Link>
      <Link to="/login">로그인 페이지로</Link>
      <Link to="/signup">회원 가입 페이지로</Link>
      <Link to="/withdraw">회원 탈퇴 페이지로</Link>
      <Link to="/">메인 페이지로</Link>
    </div>
  );
};

export default Header;
