// src/pages/Admin/AdminPage.tsx

import React from "react";
import ProductForm from "./ProductForm";

const AdminPage = () => {
  // 상품 등록 성공 시, 실행될 함수
  const handleProductSubmit = (formData: any) => {
    console.log("상품 등록 성공:", formData);
  };

  return (
    <div id="container">
      <h1>관리자 페이지</h1>
      <h2>상품 등록</h2>
      <ProductForm onSubmit={handleProductSubmit} />
    </div>
  );
};

export default AdminPage;
