// src/Layout/Header/User/HeaderPages/HeaderPages.tsx

import "./HeaderPages.css";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const HeaderPages = () => {
  const navigate = useNavigate();

  // 세션 스토리지에서 isLoggedIn 및 user_id 값 가져오기
  console.log(sessionStorage)
  const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
  const userId = sessionStorage.getItem('user_id');
  const userCash = sessionStorage.getItem('user_cash');

  const handleLogout = () => {
    // 로그아웃 시 세션 스토리지에서 값 제거
    sessionStorage.removeItem('isLoggedIn');
    sessionStorage.removeItem('user_id');
    
    // 로그아웃 후 로그인 페이지로 이동
    navigate("/login");
  };

  return (
    <div className="headerPages">
      <div className="loginStatus">
        {isLoggedIn ? (
          // 로그인 상태인 경우
          <>
            <span>{`${userId}님`}</span>
            <button onClick={handleLogout}>로그아웃</button>
            <span>{`money:${userCash}`}</span>
          </>
        ) : (
          // 로그아웃 상태인 경우
          <button onClick={() => navigate("/login")}>로그인</button>
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
