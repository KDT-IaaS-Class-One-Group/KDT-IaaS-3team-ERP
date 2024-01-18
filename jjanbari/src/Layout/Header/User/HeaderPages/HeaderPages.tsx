import './HeaderPages.css';
import React, { Link, useNavigate } from 'react-router-dom';

import LoginToggle from './LoginStatus/LoginToggle';
import { isLoggedIn } from './LoginStatus/isLoggedIn';

const HeaderPages = () => {
  const navigate = useNavigate();

  return (
    <div className="headerPages">
      <div className="loginStatus">
        <LoginToggle />
      </div>
      <div className="pages">
        <Link to="/cart">장바구니</Link>
        <Link to="/like">좋아요</Link>
        <Link
          to="/mypage"
          onClick={(event) => {
            event.preventDefault();
            navigate(isLoggedIn() ? '/mypage' : '/login');
          }}
        >
          마이페이지
        </Link>{' '}
      </div>
    </div>
  );
};

export default HeaderPages;
