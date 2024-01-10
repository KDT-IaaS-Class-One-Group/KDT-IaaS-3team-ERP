import React from 'react';
import './UserHeader.css';
// import LoginToggle from './LoginStatus/LoginToggle';
import HeaderLogo from './HeaderLogo';
import HeaderPages from './HeaderPages';
import HeaderCategory from './HeaderCategory';

// 전체 헤더를 구성하는 컴포넌트
const UserHeader = () => {
  return (
    <header id="userHeader">
      <HeaderLogo />
      <HeaderPages />
      <HeaderCategory />
    </header>
  );
};

export default UserHeader;
