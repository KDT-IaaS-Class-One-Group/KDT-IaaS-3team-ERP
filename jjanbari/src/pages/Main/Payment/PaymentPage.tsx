import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { isLoggedIn } from '../../../Layout/Header/User/HeaderPages/LoginStatus/isLoggedIn';
import handlePurchase from '../function/HandlePurchase';

type User = {
  userID: string;
  userName: string;
  userPW: string;
};

type Product = {
  id: string; // id 속성 추가
  name: string;
  price: number;
  quantity: number;
  img: string;
};

const PaymentPage = () => {
  const [address, setAddress] = useState('');
  const [detailAddress, setDetailAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [user, setUser] = useState<User | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>(undefined); // 이 줄을 여기로 이동

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // 로그인한 사용자의 정보를 가져옵니다.
    fetch('http://localhost:3001/users')
      .then((response) => response.json())
      .then((data: User) => setUser(data));

    // 선택된 상품 정보를 가져옵니다.
    const productFromState = location.state?.selectedProduct as Product | undefined;
    if (productFromState) {
      setSelectedProduct(productFromState);
    }
  }, [location.state]);

  const handleBuy = async () => {
    if (isLoggedIn() && selectedProduct) {
      await handlePurchase([selectedProduct], setSelectedProduct)(selectedProduct.id, selectedProduct.quantity);
      navigate('/');
    } else {
      navigate('/login');
    }
  };

  return (
    <div id="container">
      <h1>결제 페이지</h1>
      {selectedProduct ? (
        <div>
          <h2>받는 사람: {user?.userName}</h2>
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
