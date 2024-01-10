// src/pages/Payment/PaymentPage.tsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PaymentPage = () => {
    const [address, setAddress] = useState('');
    const [detailAddress, setDetailAddress] = useState('');
    const [phone, setPhone] = useState('');

    const navigate = useNavigate();

    const handlePayment = () => {
      // 여기에 결제 로직을 추가하세요.
      // 예를 들어, 결제가 성공하면 다음 페이지로 이동합니다.
      navigate('/success');
    };

  return (
    <div id="container">
      <h1>결제 페이지</h1>
      <div>
        <h2>받는 사람: {/* 로그인한 사용자의 이름을 여기에 표시하세요. */}</h2>
      </div>
      <div>
        <label>
          주소:
          <input
            type="text"
            //   value={address} onChange={(e) => setAddress(e.target.value)}
          />
        </label>
        <label>
          상세주소:
          <input
            type="text"
            //   value={detailAddress} onChange={(e) => setDetailAddress(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          연락처:
          <input
            type="text"
            //   value={phone} onChange={(e) => setPhone(e.target.value)}
          />
        </label>
      </div>
      <div>
        <h2>결제 상품</h2>
        {/* 결제 상품 정보를 여기에 표시하세요. */}
      </div>
      <button
      //   onClick={handlePayment}
      >
        결제하기
      </button>
    </div>
  );
};

export default PaymentPage;
