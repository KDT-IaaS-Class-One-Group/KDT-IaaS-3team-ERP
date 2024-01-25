// src/pages/Main/ProductRender.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Product } from '../interface/interface';
import { useAuth } from '../../Auth/AuthContext';

const ProductRender = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const { state } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    console.log('AuthContext state:', state);
    fetch('/products')
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, [state]);

  
    // console.log('Current login states:', state);

    const handleImageClick = (productId: number) => {
      navigate(`/product/${productId}`);
    };
  

  return (
    <div className="product-container">
      {products.length > 0 &&
        products.map((product) => (
          <div className="product-item" key={product.product_id}>
            <img
              src={product.img}
              alt={product.name}
              onClick={() => handleImageClick(product.product_id)} // 이미지 클릭 시 처리
            />
            <div className="product-details">
              <h3>{product.name}</h3>
              <p>가격: {product.price}</p>    
            </div>
          </div>
        ))}
    </div>
  );
};

export default ProductRender;