// src/pages/Admin/AdminPage.tsx
import React from "react";


import './AdminPage.css';

const AdminPage = () => {
  return (
    <div id="container">
      <h1>관리자 페이지</h1>
      <div className="statistics-tables">
        <div className="user-statistics">
          <h3>회원 목록</h3>
        </div>
        <div className="payment-statistics">
          <h3>최근 주문 목록</h3>
        </div>
      </div>
    </div>
  );
};



export default AdminPage;
