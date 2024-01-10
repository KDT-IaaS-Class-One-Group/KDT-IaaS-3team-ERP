// src/Component/Header/UserHeader.tsx

import React, { useNavigate } from 'react-router-dom';
import LoginToggle from './LoginStatus/LoginToggle';
import { isLoggedIn } from './LoginStatus/isLoggedIn';

import './UserHeader.css'
import React from 'react';
import './UserHeader.css';
// import LoginToggle from './LoginStatus/LoginToggle';
import HeaderLogo from './HeaderLogo/HeaderLogo';
import HeaderPages from './HeaderPages/HeaderPages';
import HeaderCategory from './HeaderCategory/HeaderCategory';

// 전체 헤더를 구성하는 컴포넌트
const UserHeader = () => {
  const navigate = useNavigate();

  return (
    <div id="userHeader">
      <LoginToggle />
      <a href="/">로고</a>
      <a href="/mypage" onClick={(event) => {
        event.preventDefault();
        navigate(isLoggedIn() ? '/mypage' : '/login');
      }}>마이페이지</a>
    </div>
    <header id="userHeader">
      <HeaderPages />
      <HeaderLogo />
      <HeaderCategory />
    </header>
  );
};

export default UserHeader;
