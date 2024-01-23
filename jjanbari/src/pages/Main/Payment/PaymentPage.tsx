// src/pages/Payment/PaymentPage.tsx

import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import handlePurchase from '../function/HandlePurchase';
import { User, Product } from '../../interface/interface';
import { useAuth } from '../../../Auth/AuthContext';

const PaymentPage = () => {
  const [address, setAddress] = useState('');
  const [detailAddress, setDetailAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [user, setUser] = useState<User | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>(undefined);
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
  
        // 선택된 상품 정보를 가져옵니다.
        const productFromState = location.state?.selectedProduct as Product | undefined;
        if (productFromState) {
          setSelectedProduct(productFromState);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        // 에러 처리
      }
    };
  
    fetchData();
  }, [location.state]);

  const handleBuy = async () => {
    if (state && selectedProduct) {
      try {
        // 먼저 상품 수량 감소 처리
        const purchaseSuccess = await handlePurchase(selectedProduct, setSelectedProduct);
        if (purchaseSuccess) {
          // 상품 수량 감소에 성공하면, 결제 정보를 서버로 전송
          const paymentResponse = await fetch('/payment', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              productId: selectedProduct.product_id,
            }),
          });
  
          if (paymentResponse.ok) {
            // 추가 처리 (예: 사용자에게 성공 메시지 표시)
            navigate('/'); // 주문 목록 페이지로 이동
          } else {
            throw new Error('결제 처리 실패');
          }
        } else {
          throw new Error('상품 수량 감소 실패');
        }
      } catch (error) {
        console.error('Error during payment:', error);
        // 에러 처리
      }
    } else {
      navigate('/login');
    }
  };

  return (
    <div id="container">
      <h1>결제 페이지</h1>
      {selectedProduct ? (
        <div>
          <h2>받는 사람: {user?.user_name}</h2>
          <div>
            <label>주소: </label>
            <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
            <label>상세주소: </label>
            <input type="text" value={detailAddress} onChange={(e) => setDetailAddress(e.target.value)} />
            <label>연락처: </label>
            <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
          </div>
          <div>
            <h2>결제 상품</h2>
            <img src={selectedProduct.img} alt={selectedProduct.name} style={{ width: '100px', height: '100px' }} />
            <h3>{selectedProduct.name}</h3>
            <p>가격: {selectedProduct.price}</p>
            <p>수량: {selectedProduct.quantity}</p>
            <button onClick={handleBuy}>구매하기</button>
          </div>
          <h2>총 가격: {selectedProduct.price * selectedProduct.quantity}</h2>
        </div>
      ) : (
        <p>상품이 선택되지 않았습니다.</p>
      )}
    </div>
  );
};

export default PaymentPage;
