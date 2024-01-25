// src/pages/ProductDetailPage.tsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Product } from '../interface/interface';
import { useAuth } from '../../Auth/AuthContext';
import handleAddToCart from './function/handleAddToCart';

const ProductDetail = () => {
  const [product, setProduct] = useState<Product | null>(null);
  const { state } = useAuth();
  const { productId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    console.log('AuthContext state:', state);
    fetch(`/product/${productId}`)
      .then((response) => response.json())
      .then((data) => setProduct(data));
  }, [state, productId]);

  const handleBuy = async (product: Product) => {
    const selectedQuantityElement = document.getElementById(`quantity-${product.product_id}`) as HTMLInputElement;
    if (selectedQuantityElement) {
      const selectedQuantity = Number(selectedQuantityElement.value);
      const selectedProduct = { ...product, quantity: selectedQuantity };

      // console.log('Current login state:', state);

      // 로그인 상태를 state.isAuthenticated로 확인합니다.
      if (state.isAuthenticated) {
        navigate('/payment', { state: { selectedProduct } });
      } else {
        navigate('/login');
      }
    } else {
      // 요소를 찾지 못한 경우의 오류 처리
      console.error('Selected quantity element not found');
    }
  };

  if (!product) {
    // 상품 정보를 아직 가져오지 못한 경우 로딩 상태를 표시하거나 다른 처리를 할 수 있습니다.
    return <div>Loading...</div>;
  }

  return (
    <div className="product-container">
      <div className="product-item" key={product.name}>
        <img src={product.img} alt={product.name} />
        <div className="product-details">
          <h3>{product.name}</h3>
          <p>가격: {product.price}</p>
          <p>수량: {product.quantity}</p>
          <input
            type="number"
            id={`quantity-${product.product_id}`}
            className="quantity-input"
            min="1"
            max={product.quantity}
            defaultValue="1" // 기본값 설정
          />
          <button onClick={() => handleAddToCart(product, navigate)}>장바구니</button>
          <button>좋아요</button>
          <button onClick={() => handleBuy(product)}>구매</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
