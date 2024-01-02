// src/Component/Header/Header.tsx
import React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  return <div id="header">
    {Routing()};
  </div>;
};

function Routing() {
  return (
    <Router>
      <nav>
        <Link to="/admin">관리자 페이지로</Link>
        <Link to="/login">로그인 페이지로</Link>
        <Link to="/signup">회원 가입 페이지로</Link>
        <Link to="/withdraw">회원 탈퇴 페이지로</Link>
        <Link to="/">메인 페이지로</Link>
      </nav>
    </Router>
  );
}

export default Header;
