// src/pages/Main/ProductRender.tsx

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import handlePurchase from './function/HandlePurchase';
import { isLoggedIn } from '../../Layout/Header/User/HeaderPages/LoginStatus/isLoggedIn';

type Product = {
  product_id: string;
  name: string;
  price: number;
  quantity: number;
  img: string;
};

const ProductRender = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:3001/products')
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, []);

  const handleBuy = (product: Product, quantity: number) => {
    // 수정
    if (isLoggedIn()) {
      navigate('/payment');
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="product-container">
      {products.length > 0 &&
        products.map((product) => (
          <div key={product.product_id}>
            <h2>{product.name}</h2>
            <img src={product.img} alt={product.name} /> {/* 이미지 렌더링 */}
            <p>가격: {product.price}</p>
            <p>수량: {product.quantity}</p>
            <input type="number" id={`quantity-${product.name}`} min="1" max={product.quantity} />
            <button onClick={() => handleBuy(product, Number((document.getElementById(`quantity-${product.name}`) as HTMLInputElement).value))}>구매</button>
          </div>
        ))}
    </div>
  );
};

export default ProductRender;
