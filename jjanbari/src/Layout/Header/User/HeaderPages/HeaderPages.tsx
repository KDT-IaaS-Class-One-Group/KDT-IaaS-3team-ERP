import './HeaderPages.css'
import React, { useNavigate } from 'react-router-dom';

// import LoginToggle from './LoginStatus/LoginToggle';
import { isLoggedIn } from './LoginStatus/isLoggedIn';

const HeaderPages = () => {
  const navigate = useNavigate();

  return (
    <div className="headerPages">
      <div className='loginStatus'>
        {/* <LoginToggle /> */}
      </div>
      <div className='pages'>
        <a href="/cart">장바구니</a>
        <a href="/like">좋아요</a>
        <a href="/mypage" onClick={(event) => {
        event.preventDefault();
        navigate(isLoggedIn() ? '/login' : '/mypage'); // 로그아웃 상태면 /login으로 이동
      }}>마이페이지</a>      </div>
    </div>
  );
};

export default HeaderPages;
