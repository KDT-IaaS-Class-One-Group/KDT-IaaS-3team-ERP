import React from 'react';
import { Link } from 'react-router-dom';

const Mypage = () => {
  return (
    <div id="container">
      <Link to="/order">
        <h1>주문목록</h1>
      </Link>
      <h1>주문목록</h1>
      <h1>찜한 목록</h1>
      <h1>배송조회</h1>
      <h1>장바구니</h1>
      <h1>최근 본 상품</h1>
      <h1>회원 탈퇴 페이지</h1>
    </div>
  );
};

export default Mypage;
