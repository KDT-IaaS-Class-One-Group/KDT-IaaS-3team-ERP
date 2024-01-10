// src/pages/Main/ProductRender.tsx

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import handlePurchase from './function/HandlePurchase';
import { isLoggedIn } from '../../Layout/Header/User/LoginStatus/isLoggedIn';

type Product = {
  id: number;
  name: string;
  price: number;
  quantity: number;
};

const ProductRender = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:3001/products')
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, []);

  const handleBuy = (productName: string, quantity: number) => {
    if (isLoggedIn()) {
      handlePurchase(products, setProducts)(productName, quantity);
      navigate('/payment');
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="product-container">
      {products.length > 0 &&
        products.map((product) => (
          <div key={product.id}>
            <h2>{product.name}</h2>
            <p>가격: {product.price}</p>
            <p>수량: {product.quantity}</p>
            <input type="number" id={`quantity-${product.id}`} min="1" max={product.quantity} />
            <button onClick={() => handlePurchase(products, setProducts)(product.id, Number((document.getElementById(`quantity-${product.id}`) as HTMLInputElement).value))}>구매</button>
          </div>
        ))}
    </div>
  );
};

export default ProductRender;
