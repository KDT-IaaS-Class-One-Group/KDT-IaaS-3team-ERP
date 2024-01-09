// src/pages/Admin/AdminPage.tsx
import React from "react";
import { Link } from 'react-router-dom';


import './AdminPage.css';

const AdminPage = () => {
  return (
    <div id="container">
      <h1>관리자 페이지</h1>
      <Link to="/">
        <h2>사용자 페이지로 이동</h2>
      </Link>
    </div>
  );
};



export default AdminPage;
