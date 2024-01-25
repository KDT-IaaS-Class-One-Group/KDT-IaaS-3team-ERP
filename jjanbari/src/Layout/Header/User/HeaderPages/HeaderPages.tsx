// src/Layout/Header/User/HeaderPages/HeaderPages.tsx
import "./HeaderPages.css";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../../Auth/AuthContext";

const HeaderPages = () => {
  const navigate = useNavigate();
  const { state, logout } = useAuth();

  const handleLogout = () => {
    // AuthContext에서 로그아웃 처리
    logout();

    // 로그아웃 후 로그인 페이지로 이동
    navigate("/login");
  };

  return (
    <div className="headerPages">
      <div className="loginStatus">
        {state.isAuthenticated ? (
          // 로그인 상태인 경우
          <>
            <span>{`${state.user?.username}님`}</span>
            <button onClick={handleLogout}>로그아웃</button>
          </>
        ) : (
          // 로그아웃 상태인 경우
          <button onClick={() => navigate("/login")}>로그인</button>
        )}
      </div>

      <div className="pages">
        <Link to={state.isAuthenticated ? "/cart" : "/login"}>장바구니</Link>
        <Link to={state.isAuthenticated ? "/like" : "/login"}>좋아요</Link>
        <Link to={state.isAuthenticated ? "/mypage" : "/login"}>마이페이지</Link>
      </div>
    </div>
  );
};

export default HeaderPages;
