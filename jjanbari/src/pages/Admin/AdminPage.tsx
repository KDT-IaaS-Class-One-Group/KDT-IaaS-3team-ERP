// src/pages/Admin/AdminPage.tsx

import React from "react";
import ProductForm from "./ProductForm";


import './AdminPage.css';

const AdminPage = () => {
  return (
    <div id="container">
      <h1>관리자 페이지</h1>
      <ProductForm />
    </div>
  );
};

export default AdminPage;
