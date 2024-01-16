// src/pages/Main/ProductRender.tsx

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { isLoggedIn } from '../../Layout/Header/User/HeaderPages/LoginStatus/isLoggedIn';
import addCart from './function/addCart';

type Product = {
  id: string;
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

  const getCurrentUserId = (): string | null => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user).id : null;
  };

  const handleAddToCartClick = async (product: Product) => {
    if (!isLoggedIn()) {
      navigate('/login');
      return;
    }

    const userId = getCurrentUserId();
    const quantity = Number(document.getElementById(`quantity-${product.id}`)?.value || 0);

    const success = await addCart(product.id, quantity, userId);
    if (!success) {
      alert('장바구니 추가 실패');
    }
  };

  const handleBuy = (product: Product) => {
    // 선택한 수량을 가져옵니다.
    const selectedQuantity = Number((document.getElementById(`quantity-${product.name}`) as HTMLInputElement).value);

    // 선택한 수량을 포함한 새로운 상품 객체를 생성합니다.
    const selectedProduct = { ...product, quantity: selectedQuantity };

    if (isLoggedIn()) {
      navigate('/payment', { state: { selectedProduct } });
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="product-container">
      {products.length > 0 &&
        products.map((product) => (
          <div className="product-item" key={product.id}>
            <img src={product.img} alt={product.name} /> {/* 이미지 렌더링 */}
            <div className="product-details">
              <h3>{product.name}</h3>
              <br></br>
              <p>가격: {product.price}</p>
              <p>수량: {product.quantity}</p>
              <input type="number" id={`quantity-${product.name}`} min="1" max={product.quantity} />
              <button onClick={() => handleAddToCartClick(product)}>장바구니</button>
              <button>좋아요</button>
              <button onClick={() => handleBuy(product)}>바로구매</button>
            </div>
          </div>
        ))}
    </div>
  );
};
export default ProductRender;
