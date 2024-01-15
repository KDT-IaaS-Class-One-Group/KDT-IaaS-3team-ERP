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
        navigate(isLoggedIn() ? '/mypage' : '/login');
      }}>마이페이지</a>      </div>
    </div>
  );
};

export default HeaderPages;
