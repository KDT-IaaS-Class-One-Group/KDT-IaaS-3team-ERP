import React from 'react';
import { Link } from 'react-router-dom';

const Mypage = () => {
  return (
    <div id="container">
      <Link to="/order">
        <h1>주문목록</h1>
      </Link>
      <Link to="/delivery">
        <h1>배송조회</h1>
      </Link>
      <Link to="/withdraw">
        <h1>회원 탈퇴 페이지</h1>
      </Link>
    </div>
  );
};

export default Mypage;
