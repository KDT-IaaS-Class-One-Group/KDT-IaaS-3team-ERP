// src/pages/Payment/PaymentPage.tsx

import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { isLoggedIn } from '../../../Layout/Header/User/HeaderPages/LoginStatus/isLoggedIn';
import { User, Product } from '../../interface/interface';
import handlePurchase from '../function/HandlePurchase';

type CartItem = {
  product_id: number;
  name: string;
  img: string | null;
  cart_quantity: number;
  cart_price: number;
};

const PaymentPage = () => {
  const [address, setAddress] = useState('');
  const [detailAddress, setDetailAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [user, setUser] = useState<User | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]); // 장바구니 상품 목록

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // 로그인한 사용자의 정보를 가져옵니다.
    fetch('/users')
      .then((response) => response.json())
      .then((data: User) => setUser(data));

    // location.state에서 장바구니 상품 목록을 가져옵니다.
    const itemsFromState = location.state?.cartItems as CartItem[] | undefined;
    if (itemsFromState) {
      setCartItems(itemsFromState);
    }
  }, [location.state]);

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.cart_price * item.cart_quantity, 0);
  };

  const convertToProduct = (cartItem: CartItem): Product => {
    return {
      product_id: cartItem.product_id,
      name: cartItem.name,
      price: cartItem.cart_price,
      quantity: cartItem.cart_quantity,
      img: cartItem.img
    };
  };

  const handleBuy = async () => {
    if (isLoggedIn()) {
      try {
        for (const cartItem of cartItems) {
          const product = convertToProduct(cartItem); // CartItem을 Product로 변환
          const purchaseSuccess = await handlePurchase(product, () => {});
          if (!purchaseSuccess) {
            throw new Error(`상품 '${product.name}' 수량 감소 실패`);
          }
        }
        // 모든 상품 결제 처리가 성공한 경우
        navigate('/');
      } catch (error) {
        console.error('Error during payment:', error);
        // 에러 처리: 사용자에게 에러 메시지 표시
      }
    } else {
      navigate('/login');
    }
  };

  return (
    <div id="container">
      <h1>결제 페이지</h1>
      <div>
        {cartItems.map((item, index) => (
          <div key={index}>
            <img src={item.img} alt={item.name} style={{ width: '100px', height: '100px' }} />
            <h3>{item.name}</h3>
            <p>가격: {item.cart_price}</p>
            <p>수량: {item.cart_quantity}</p>
          </div>
        ))}
      </div>
      <div>
        <h2>총 가격: {calculateTotalPrice()}</h2>
        <button onClick={handleBuy}>결제하기</button>
      </div>
      <div>
        <h2>배송 정보</h2>
        <label>주소: </label>
        <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
        <br />
        <label>상세주소: </label>
        <input type="text" value={detailAddress} onChange={(e) => setDetailAddress(e.target.value)} />
        <br />
        <label>연락처: </label>
        <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
      </div>
    </div>
  );
};

export default PaymentPage;
