// src/Component/Header/UserHeader.tsx

import React from 'react-router-dom';

import './UserHeader.css'
import HeaderLogo from './HeaderLogo/HeaderLogo';
import HeaderPages from './HeaderPages/HeaderPages';
import HeaderCategory from './HeaderCategory/HeaderCategory';

// 전체 헤더를 구성하는 컴포넌트
const UserHeader = () => {

  return (
    <header id="userHeader">
      <HeaderPages />
      <HeaderLogo />
      <HeaderCategory />
    </header>
  );
};

export default UserHeader;
