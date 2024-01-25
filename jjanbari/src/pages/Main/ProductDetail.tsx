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
    fetch(`/product/${productId}`)
      .then((response) => response.json())
      .then((data) => setProduct(data));
  }, [state, productId]);

  const handleBuy = async (product: Product) => {
    const selectedQuantity = Number(
      (document.getElementById(`quantity-${product.product_id}`) as HTMLInputElement).value
    );
    const selectedProduct = { ...product, quantity: selectedQuantity };
  
    if (state) {
      navigate('/payment', { state: { selectedProduct } });
    } else {
      navigate('/login');
    }
  };

  if (!product) {
    // 상품 정보를 아직 가져오지 못한 경우 로딩 상태를 표시하거나 다른 처리를 할 수 있습니다.
    return <div>Loading...</div>;
  }

  return (
    <div className="product-container">
      <div className="product-item" key={product.product_id}>
        <img src={product.img} alt={product.name} />
        <div className="product-details">
          <h3>{product.name}</h3>
          <p>가격: {product.price}</p>
          <p>수량: {product.quantity}</p>
          <input type="number" id={`quantity-${product.product_id}`} min="1" max={product.quantity} />
          <button onClick={() => handleAddToCart(product, navigate)}>장바구니</button>
          <button>좋아요</button>
          <button onClick={() => handleBuy(product)}>구매</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
