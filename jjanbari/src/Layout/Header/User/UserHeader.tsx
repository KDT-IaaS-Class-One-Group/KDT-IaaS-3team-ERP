// src/Component/Header/Header.tsx

import './UserHeader.css';
import LoginToggle from '../../../Test/LoginToggle';

const UserHeader = () => {
  return (
    <div id="userHeader">
      <LoginToggle />
      <a href="/">로고</a>
      <a href="/mypage">마이페이지</a>
    </div>
  );
};

export default UserHeader;
