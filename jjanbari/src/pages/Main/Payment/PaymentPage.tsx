// src/pages/Payment/PaymentPage.tsx

import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import handlePurchase from '../function/HandlePurchase';
import { User, Product } from '../../interface/interface';
import { useAuth } from '../../../Auth/AuthContext';
import { CartItem } from '../../interface/interface';

// PaymentPage 컴포넌트 정의
const PaymentPage = () => {
  // 상태(State) 변수들 정의
  const [address, setAddress] = useState('');
  const [detailAddress, setDetailAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [user, setUser] = useState<User | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [productImages, setProductImages] = useState<{ [key: number]: string }>({});
  const { state } = useAuth();

  // React Router의 navigate 함수와 현재 페이지 정보 가져오기
  const navigate = useNavigate();
  const location = useLocation();

  // 컴포넌트가 처음 로드될 때와 location.state가 변경될 때에 데이터를 가져오는 useEffect 정의
  useEffect(() => {
    const fetchData = async () => {
      try {
        // 로그인한 사용자의 정보 가져오기
        const userDataResponse = await fetch('/users');
        const userData = await userDataResponse.json();
        setUser(userData);

        // location.state에서 장바구니 상품 목록 가져오기
        const itemsFromState = location.state?.cartItems as CartItem[] | undefined;
        if (itemsFromState) {
          setCartItems(itemsFromState);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();

    const stateData = location.state;
    if (stateData) {
      if (stateData.selectedProduct) {
        const selectedProduct = stateData.selectedProduct as Product;
        setCartItems([selectedProduct]);
      } else if (stateData.cartItems) {
        const cartItemsFromCartPage = stateData.cartItems as CartItem[];
        setCartItems(cartItemsFromCartPage);
      }
    }
  }, [location.state]);

  // 상품 이미지 URL을 가져오는 로직을 정의
  useEffect(() => {
    cartItems.forEach((item) => {
      fetch(`/products/${item.product_id}`)
        .then((response) => response.json())
        .then((data) => {
          setProductImages((prev) => ({ ...prev, [item.product_id]: data.img }));
        })
        .catch((error) => console.error('Error fetching product image:', error));
    });
  }, [cartItems]);

  //cartItems 배열을 순회하면서 각 항목의 cart_price와 cart_quantity를 곱하여 총 가격을 계산
  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  /** 
   * CartItem을 Product로 변환하는 함수 정의 
   * 여기서는 해당 상품의 이미지 URL을 가져옴
  */
  const convertToProduct = (cartItem: CartItem): Product => {
    return {
      product_id: cartItem.product_id,
      name: cartItem.name,
      price: cartItem.price,
      quantity: cartItem.quantity,
      img: productImages[cartItem.product_id] || 'placeholder.jpg',
    };
  };

  // 결제 버튼을 클릭하면 실행되는 함수 정의
  const handleBuy = async () => {
    if (state) {
      try {
        // 각 상품에 대한 비동기 작업을 순차적으로 처리
        for (const cartItem of cartItems) {
          const product = convertToProduct(cartItem);
          const purchaseSuccess = await handlePurchase(product, () => {});
  
          if (!purchaseSuccess) {
            throw new Error(`상품 '${product.name}' 수량 감소 실패`);
          }
  
          const paymentResponse = await fetch('/payment', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              productId: product.product_id,
              payment_date: new Date().toISOString(), // 현재 날짜 및 시간
              payment_quantity: cartItem.quantity,
              payment_price: cartItem.price * cartItem.quantity,
            }),
          });
  
          if (!paymentResponse.ok) {
            // 서버 사이드에서 오류 응답일 경우의 에러 처리
            throw new Error(`상품 '${product.name}' 결제 처리 실패`);
          }
  
          // 상품 결제 후 장바구니에서 삭제
          const userId = sessionStorage.getItem('user_id');
          await fetch(`/cart/${userId}/${product.product_id}`, {
            method: 'DELETE',
          });
        }
  
        // 모든 상품 결제 처리가 성공한 경우에만 페이지 이동
        navigate('/');
      } catch (error) {
        console.error('Error during payment:', error);
      }
    } else {
      navigate('/login');
    }
  };
  
  

  // PaymentPage 컴포넌트 내부
  return (
    <div id="container">
      <h1>결제 페이지</h1>
      <div className="cart-page">
        <div className="cart-list">
          <div className="cart-name">
            <p> 상품 이미지 </p>
            <p> 상품 이름 </p>
            <p> 상품 가격 </p>
            <p> 상품 수량</p>
            <p>총 가격</p> {/* 결제 페이지에선 이 칸이 필요 없을 수 있음 */}
          </div>
          {cartItems.map((item, index) => (
            <div className="cart-item" key={index}>
              <img src={productImages[item.product_id] || 'placeholder.jpg'} className="image" alt={item.name} />
              <div className="cart-item-detail">
                <h3>{item.name}</h3>
              </div>
              <div className="cart-item-detail">
                <p>{item.price}</p>
              </div>
              <div className="cart-item-detail">
                <p>{item.quantity}</p>
              </div>
              <div className="cart-item-detail">
                <p>{item.price * item.quantity}</p> {/* 총 가격 계산 */}
              </div>
            </div>
          ))}
        </div>
        <div className="delivery-info">
          <h2>배송 정보</h2>
          <label>주소:</label>
          <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
          <label>상세주소:</label>
          <input type="text" value={detailAddress} onChange={(e) => setDetailAddress(e.target.value)} />
          <label>연락처:</label>
          <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
        </div>
        <div className="cart-summary">
          <p>총 가격: {calculateTotalPrice()}</p>
          <button className="cart-button" onClick={handleBuy}>
            결제하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
