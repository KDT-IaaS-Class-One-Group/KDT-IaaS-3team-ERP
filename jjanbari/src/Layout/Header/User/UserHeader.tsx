// src/Component/Header/UserHeader.tsx

import React, { useNavigate } from 'react-router-dom';
import LoginToggle from './LoginStatus/LoginToggle';
import { isLoggedIn } from './LoginStatus/isLoggedIn';

import './UserHeader.css'

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
  );
};

export default UserHeader;
