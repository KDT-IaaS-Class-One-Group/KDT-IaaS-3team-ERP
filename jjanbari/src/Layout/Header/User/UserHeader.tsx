// src/Component/Header/Header.tsx

import './UserHeader.css';

const UserHeader = () => {
  return (
    <div id="userHeader">
      <a href="/login">로그인 페이지로</a>
      <a href="/">로고</a>
      <a href="/mypage">마이페이지</a>
    </div>
  );
};

export default UserHeader;
