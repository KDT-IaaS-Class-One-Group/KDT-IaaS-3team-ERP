// src/pages/Admin/AdminPage.tsx

import React from "react";
import ProductForm from "./ProductForm";
import AdminHeader from "../../Layout/Header/Admin/AdminHeader";


import './AdminPage.css';

const AdminPage = () => {
  return (
    <div id="adminContainer">
      <AdminHeader />
      <div id="container">
        <h1>관리자 페이지</h1>
        <ProductForm />
      </div>
    </div>
  );
};



export default AdminPage;
