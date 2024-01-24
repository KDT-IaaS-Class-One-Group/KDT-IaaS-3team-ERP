// src/pages/Main/ProductRender.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Product } from '../interface/interface';
import { useAuth } from '../../Auth/AuthContext';
import handleAddToCart from './function/handleAddToCart';

const ProductRender = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const { state } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    console.log('ProductRender 내 isLoggedIn:', state);
    fetch('/products')
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, [state]);

  const handleBuy = async (product: Product) => {
    const selectedQuantity = Number((document.getElementById(`quantity-${product.name}`) as // 이부분 오류
    HTMLInputElement).value);
    const selectedProduct = { ...product, quantity: selectedQuantity };

    if (state) {
      navigate('/payment', { state: { selectedProduct } });
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="product-container">
      {products.length > 0 &&
        products.map((product) => (
          <div className="product-item" key={product.name}> {/* 이 부분도 오류 */}
            <img src={product.img} alt={product.name} />
            <div className="product-details">
              <h3>{product.name}</h3>
              <p>가격: {product.price}</p>
              <p>수량: {product.quantity}</p>
              <input type="number" id={`quantity-${product.name}`} min="1" max={product.quantity} />
              <button onClick={() => handleAddToCart(product, navigate)}>장바구니</button>
              <button>좋아요</button>
              <button onClick={() => handleBuy(product)}>구매</button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default ProductRender;
