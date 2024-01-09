// src/pages/Admin/ProductForm.tsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import handleSubmit from '../../function/HandleSubmit';

const ProductForm = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState(0);

  const navigate = useNavigate();

  return (
    <form onSubmit={handleSubmit(name, price, quantity, navigate)}>
      <label htmlFor="name">상품명:</label>
      <br />
      <input type="text" id="name" name="NAME" value={name} onChange={(e) => setName(e.target.value)} />
      <br />
      <label htmlFor="price">가격:</label>
      <br />
      <input type="text" id="price" name="PRICE" value={price} onChange={(e) => setPrice(e.target.value)} />
      <br />
      <label htmlFor="quantity">수량:</label>
      <br />
      <input type="number" id="quantity" name="QUANTITY" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} />
      <br />
      <input type="submit" value="상품 등록" />
    </form>
  );
};

export default ProductForm;
