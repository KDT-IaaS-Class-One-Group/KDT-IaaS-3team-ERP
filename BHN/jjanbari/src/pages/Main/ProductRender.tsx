// src/pages/Main/ProductRender.tsx

import React, { useState, useEffect } from 'react';

const SERVER_URL = 'http://localhost:3001/main';

interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

const ProductRender = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(SERVER_URL)
      .then(response => {
        if (!response.ok) {
          throw new Error('상품 정보를 가져오는 중 오류가 발생했습니다.');
        }
        return response.json();
      })
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="product-container">
      <h2>상품 목록</h2>
      <ul className="product-list">
        {products.map((product: Product) => (
          <li key={product.id} className="product-item">
            <p className="product-name">상품명: {product.name}</p>
            <p className="product-price">가격: {product.price}원</p>
            <p className="product-quantity">수량: {product.quantity}개</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductRender;
