// src/pages/Admin/AdminPage.tsx
import React from "react";


import './AdminPage.css';

const AdminPage = () => {
  return (
    <div id="container">
      <h1>관리자 페이지</h1>
      <div className="statitics-tables">
        <div className="user-table">
          <h3>최근 회원 목록</h3>

        </div>
        <div className="product-table">
          <h3>최근 등록된 상품</h3>

        </div>
      </div>
    </div>
  );
};



export default AdminPage;
