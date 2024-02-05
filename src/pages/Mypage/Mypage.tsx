import React from 'react';
import { Link } from 'react-router-dom';

import './Mypage.css'

const Mypage = () => {
  return (
    <div id="container">
      <div className='mypage-container'>
        <Link to="/order" style={{ textDecoration: "none"}}>
          <div className='mypage-item'>
            <div className='orderImage'></div>
            <p>주문목록</p>
          </div>
        </Link>
        <Link to="/delivery" style={{ textDecoration: "none"}}>
          <div className='mypage-item'>
            <div className='deliveryImage'></div>
            <p>배송조회</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Mypage;
