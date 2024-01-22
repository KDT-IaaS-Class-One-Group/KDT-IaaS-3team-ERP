// src/Layout/Header/User/HeaderPages/HeaderPages.tsx

import "./HeaderPages.css";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../../../../Auth/AuthContext";

const HeaderPages = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  return (
    <div className="headerPages">
      <div className="loginStatus">
        {isLoggedIn ? (
          // 로그인 상태인 경우
          <span onClick={() => navigate("/logout")}>로그아웃</span>
        ) : (
          // 로그아웃 상태인 경우
          <Link to="/login">로그인</Link>
        )}
      </div>

      <div className="pages">
        <Link
          to={isLoggedIn ? "/cart" : "/login"}
          onClick={(event) => {
            event.preventDefault();
            navigate(isLoggedIn ? "/cart" : "/login");
          }}
        >
          장바구니
        </Link>
        <Link
          to={isLoggedIn ? "/like" : "/login"}
          onClick={(event) => {
            event.preventDefault();
            navigate(isLoggedIn ? "/like" : "/login");
          }}
        >
          좋아요
        </Link>
        <Link
          to={isLoggedIn ? "/mypage" : "/login"}
          onClick={(event) => {
            event.preventDefault();
            navigate(isLoggedIn ? "/mypage" : "/login");
          }}
        >
          마이페이지
        </Link>{" "}
      </div>
    </div>
  );
};

export default HeaderPages;
