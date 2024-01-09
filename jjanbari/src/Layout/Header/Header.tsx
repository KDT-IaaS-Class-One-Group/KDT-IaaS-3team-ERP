// src/Component/Header/Header.tsx

import './Header.css';

const Header = () => {
  return (
    <div id="header">
      <a href="/login" className='header'>로그인 페이지로</a>
      <a href="/" className='header'>로고</a>
      <a href="/mypage" className='header'>마이페이지</a>
    </div>
  );
};

export default Header;
