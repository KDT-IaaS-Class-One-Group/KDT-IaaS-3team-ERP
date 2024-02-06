// src/pages/Payment/PaymentPage.tsx

import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import handlePurchase from '../function/HandlePurchase';
import { User, Product } from '../../interface/interface';
import { useAuth } from '../../../Auth/AuthContext';
import { CartItem } from '../../interface/interface';

const PaymentPage = () => {
  const [address, setAddress] = useState('');
  const [detailAddress, setDetailAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [user, setUser] = useState<User | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [productImages, setProductImages] = useState<{ [key: number]: string }>({});
  const { state } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 로그인한 사용자의 정보를 가져옵니다.
        const userDataResponse = await fetch('/users');
        const userData = await userDataResponse.json();
        setUser(userData);

        // location.state에서 장바구니 상품 목록을 가져옵니다.
        const itemsFromState = location.state?.cartItems as CartItem[] | undefined;
        if (itemsFromState) {
          setCartItems(itemsFromState);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        // 에러 처리
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

  useEffect(() => {
    // 상품 이미지 URL을 가져오는 로직
    cartItems.forEach((item) => {
      fetch(`/products/${item.product_id}`)
        .then((response) => response.json())
        .then((data) => {
          setProductImages((prev) => ({ ...prev, [item.product_id]: data.img }));
        })
        .catch((error) => console.error('Error fetching product image:', error));
    });
  }, [cartItems]);

  //cartItems 배열을 순회하면서 각 항목의 cart_price와 cart_quantity를 곱하여 총 가격을 계산합니다.
  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  //CartItem 타입의 객체를 Product 타입으로 변환합니다. 이 과정에선 해당 상품의 이미지 URL을 가져옵니다.
  const convertToProduct = (cartItem: CartItem): Product => {
    return {
      product_id: cartItem.product_id,
      name: cartItem.name,
      price: cartItem.price,
      quantity: cartItem.quantity,
      img: productImages[cartItem.product_id] || 'placeholder.jpg',
    };
  };

  const handleBuy = async () => {
    if (state) {
      try {
        for (const cartItem of cartItems) {
          //함수를 사용하여 CartItem을 Product 객체로 변환
          const product = convertToProduct(cartItem);
          //handlePurchase 함수를 호출하여 상품의 수량 감소 처리
          const purchaseSuccess = await handlePurchase(product, () => {});
          if (!purchaseSuccess) {
            throw new Error(`상품 '${product.name}' 수량 감소 실패`);
          }
          
          // 상품별 결제 정보 서버로 전송
          const paymentResponse = await fetch('/payment', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ productId: product.product_id }),
          });

          if (!paymentResponse.ok) {
            throw new Error(`상품 '${product.name}' 결제 처리 실패`);
          }

          // 결제가 완료된 상품을 장바구니에서 삭제
          const userId = state.user?.username;
          await fetch(`/cart/${userId}/${product.product_id}`, {
            method: 'DELETE',
          });
        }

        // 모든 상품 결제 처리가 성공한 경우
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
