// src/pages/Main/ProductRender.tsx

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 수정
import handlePurchase from './function/HandlePurchase';

type Product = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

const ProductRender = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const navigate = useNavigate(); // 수정

  useEffect(() => {
    fetch('http://localhost:3001/products')
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, []);

  const handleBuy = (productName: string, quantity: number) => {
    // 추가
    handlePurchase(products, setProducts)(productName, quantity);
    navigate('/payment'); // 수정
  };

  return (
    <div className="product-container">
      {products.length > 0 &&
        products.map((product) => (
          <div key={product.id}>
            <h2>{product.name}</h2>
            <p>가격: {product.price}</p>
            <p>수량: {product.quantity}</p>
            <input type="number" id={`quantity-${product.name}`} min="1" max={product.quantity} />
            <button onClick={() => handleBuy(product.name, Number((document.getElementById(`quantity-${product.name}`) as HTMLInputElement).value))}>구매</button>
          </div>
        ))}
    </div>
  );
};

export default ProductRender;
