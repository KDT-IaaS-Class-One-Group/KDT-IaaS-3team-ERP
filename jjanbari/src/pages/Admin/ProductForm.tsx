// src/pages/Admin/ProductForm.tsx

import React, { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";

const AdminPage = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!name || !price || !quantity) {
      alert('빈칸을 채워서 제출해주세요');
      return;
    }

    try {
      const response = await fetch('/addProducts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, price, quantity }),
      });

      const result = await response.json();

      if (result.success) {
        alert('상품이 등록되었습니다');
        navigate("/");
        // 추가로 필요한 동작 수행 (예: 등록한 상품 목록 새로고침)
      } else {
        alert(result.error || '상품 등록에 실패하였습니다');
      }
    } catch (error: any) {
      console.error('Error during product registration:', error.message);
      alert('상품 등록에 실패하였습니다');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
    <label htmlFor="name">상품명:</label>
    <br />
    <input type="text" id="name" name="productName" value={name} onChange={(e) => setName(e.target.value)} />
    <br />
    <label htmlFor="price">가격:</label>
    <br />
    <input type="text" id="price" name="productPrice" value={price} onChange={(e) => setPrice(e.target.value)} />
    <br />
    <label htmlFor="quantity">수량:</label>
    <br />
    <input type="text" id="quantity" name="productQuantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
    <br />
    <input type="submit" value="상품 등록" />
  </form>
  );
};

export default AdminPage;
