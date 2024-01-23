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
    console.log('ProductRender 내 isLoggedIn:', state);
    fetch('/products')
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, [state]);

  const handleBuy = (product: Product) => {
    // 선택한 수량을 가져옵니다.
    const selectedQuantity = Number((document.getElementById(`quantity-${product.name}`) as HTMLInputElement).value);

    // 선택한 수량을 포함한 새로운 상품 객체를 생성합니다.
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
          <div className="product-item" key={product.product_id}>
            <img src={product.img} alt={product.name} /> {/* 이미지 렌더링 */}
            <div className='product-details'>
              <h3>{product.name}</h3>
              <br></br>
              <p>가격: {product.price}</p>
              <p>수량: {product.quantity}</p>
              <input type="number" id={`quantity-${product.name}`} min="1" max={product.quantity} />
              <button onClick={() => handleBuy(product)}>구매</button>
            </div>
          </div>
        ))}
    </div>
  );
}
export default ProductRender;
