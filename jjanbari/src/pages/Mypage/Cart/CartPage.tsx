// src/pages/Mypage/Cart/CartPage.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { isLoggedIn } from '../../../Layout/Header/User/HeaderPages/LoginStatus/isLoggedIn';
import { Product } from '../../interface/interface';

type CartItem = {
  product: Product;
  cart_qty: number;
};

const CartPage = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:3001/cart')
      .then((response) => response.json())
      .then((data) => {
        // 데이터가 배열 형식인지 확인
        if (Array.isArray(data)) {
          setCartItems(data);
          calculateTotalPrice(data);
        } else {
          // 데이터가 배열이 아닌 경우, 오류 처리나 대체 로직 실행
          console.error('장바구니 데이터가 배열 형식이 아닙니다:', data);
        }
      })
      .catch((error) => {
        console.error('장바구니 데이터 로딩 중 오류 발생:', error);
      });
  }, []);

  const calculateTotalPrice = (items: CartItem[]) => {
    let sum = 0;
    for (let item of items) {
      sum += item.product.price * item.cart_qty;
    }
    setTotalPrice(sum);
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>, product: Product) => {
    const newQuantity = Number(e.target.value);
    if (newQuantity < 1 || newQuantity > product.quantity) {
      alert('수량이 유효하지 않습니다.');
      return;
    }

    fetch(`http://localhost:3001/cart/${product.product_id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cart_qty: newQuantity }),
    })
      .then((response) => response.json())
      .then(() => {
        // 카트 아이템 업데이트
        const updatedItems = cartItems.map((item) => (item.product.product_id === product.product_id ? { ...item, cart_qty: newQuantity } : item));
        setCartItems(updatedItems);
        calculateTotalPrice(updatedItems);
      });
  };

  const handleDeleteClick = (product: Product) => {
    fetch(`http://localhost:3001/cart/${product.product_id}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then(() => {
        const updatedItems = cartItems.filter((item) => item.product.product_id !== product.product_id);
        setCartItems(updatedItems);
        calculateTotalPrice(updatedItems);
      });
  };

  const handleCheckoutClick = () => {
    navigate('/payment', { state: { cartItems } });
  };

  return (
    <div className="cart-page">
      <h1>장바구니</h1>
      <div className="cart-list">
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <div className="cart-item" key={item.product.product_id}>
              <img src={item.product.img} alt={item.product.name} />
              <div className="cart-item-details">
                <h3>{item.product.name}</h3>
                <p>가격: {item.product.price}</p>
                <p>수량: {item.cart_qty}</p>
                <input type="number" value={item.cart_qty} min="1" max={item.product.quantity} onChange={(e) => handleQuantityChange(e, item.product)} />
                <button onClick={() => handleDeleteClick(item.product)}>삭제</button>
              </div>
            </div>
          ))
        ) : (
          <p>장바구니에 담긴 상품이 없습니다.</p>
        )}
      </div>
      <div className="cart-summary">
        <p>총 가격: {totalPrice}</p>
        <button onClick={handleCheckoutClick}>결제하기</button>
      </div>
    </div>
  );
};

export default CartPage;
