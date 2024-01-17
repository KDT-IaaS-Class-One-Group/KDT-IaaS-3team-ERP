// src/pages/Mypage/Cart/CartPage.tsx

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { isLoggedIn } from '../../../Layout/Header/User/HeaderPages/LoginStatus/isLoggedIn';

type Product = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  img: string;
};

type CartItem = {
  product: Product;
  cart_qty: number;
};

const CartPage = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    // 장바구니에 담긴 상품들을 가져옵니다.
    fetch('http://localhost:3001/cart')
      .then((response) => response.json())
      .then((data) => setCartItems(data));

    // 장바구니에 담긴 상품들의 총 가격을 계산합니다.
    let sum = 0;
    for (let item of cartItems) {
      sum += item.product.price * item.cart_qty;
    }
    setTotalPrice(sum);
  }, [cartItems]);

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>, product: Product) => {
    // 장바구니에 담긴 상품의 수량을 변경합니다.
    const newQuantity = Number(e.target.value);

    // 수량이 유효한 범위인지 확인합니다.
    if (newQuantity < 1 || newQuantity > product.quantity) {
      alert('수량이 유효하지 않습니다.');
      return;
    }

    // 장바구니에 상품의 수량을 업데이트하는 API를 호출합니다.
    fetch(`http://localhost:3001/cart/${product.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ cart_qty: newQuantity }), // 변경된 수량을 전달합니다.
    })
      .then((response) => response.json())
      .then((data) => {
        // 장바구니 상태를 업데이트합니다.
        setCartItems(cartItems.map((item) => (item.product.id === product.id ? { ...item, cart_qty: data.cart_qty } : item)));
      });
  };

  const handleDeleteClick = (product: Product) => {
    // 장바구니에서 상품을 삭제합니다.
    // 장바구니에서 상품을 삭제하는 API를 호출합니다.
    fetch(`http://localhost:3001/cart/${product.id}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then((data) => {
        // 장바구니 상태를 업데이트합니다.
        setCartItems(cartItems.filter((item) => item.product.id !== product.id));
      });
  };

  const handleCheckoutClick = () => {
    // 결제하기 버튼을 클릭하면, 결제 페이지로 이동합니다.
    // 결제 페이지에 장바구니에 담긴 상품들의 정보를 전달합니다.
    navigate('/payment', { state: { cartItems } });
  };

  return (
    <div className="cart-page">
      <h1>장바구니</h1>
      <div className="cart-list">
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <div className="cart-item" key={item.product.id}>
              <img src={item.product.img} alt={item.product.name} />
              <div className="cart-item-details">
                <h3>{item.product.name}</h3>
                <p>가격: {item.product.price}</p>
                <p>수량: {item.product.quantity}</p>
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
