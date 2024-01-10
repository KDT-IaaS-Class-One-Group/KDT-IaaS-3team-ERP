// src/pages/Payment/PaymentPage.tsx

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import handlePurchase from '../function/HandlePurchase';
import { isLoggedIn } from '../../../Layout/Header/User/HeaderPages/LoginStatus/isLoggedIn';

type User = {
  userID: string;
  userName: string;
  userPW: string;
};

type Product = {
  name: string;
  price: number;
  quantity: number;
};

const PaymentPage = () => {
  const [address, setAddress] = useState('');
  const [detailAddress, setDetailAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [user, setUser] = useState<User | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [totalPrice, setTotalPrice] = useState(0); // 추가

  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:3001/login')
      .then((response) => response.json())
      .then((data: User) => setUser(data));

    fetch('http://localhost:3001/products')
      .then((response) => response.json())
      .then((data: Product[]) => {
        setProducts(data);
        setTotalPrice(data.reduce((sum: number, product: Product) => sum + product.price * product.quantity, 0));
      });
  }, []);

  const handleQuantityChange = (productName: string, quantity: number) => {
    setProducts(products.map((product) => (product.name === productName ? { ...product, quantity } : product)));
    setTotalPrice(products.reduce((sum: number, product: Product) => sum + product.price * (product.name === productName ? quantity : product.quantity), 0));
  };

  const handleBuy = (product: Product) => {
    // 수정
    if (isLoggedIn()) {
      handlePurchase(products, setProducts)(product.name, product.quantity);
      navigate('/');
    } else {
      navigate('/login');
    }
  };

  return (
    <div id="container">
      <h1>결제 페이지</h1>
      <div>
        <h2>받는 사람: {user?.userName}</h2>
      </div>
      <div>
        <label>
          주소:
          <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
        </label>
        <label>
          상세주소:
          <input type="text" value={detailAddress} onChange={(e) => setDetailAddress(e.target.value)} />
        </label>
      </div>
      <div>
        <label>
          연락처:
          <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
        </label>
      </div>
      <div>
        <h2>결제 상품</h2>
        {products.map((product, index) => (
          <div key={index}>
            <h3>{product.name}</h3>
            <p>가격: {product.price}</p>
            <p>
              수량: <input type="number" value={product.quantity} onChange={(e) => handleQuantityChange(product.name, Number(e.target.value))} />
            </p>
            <button onClick={() => handleBuy(product)}>구매하기</button> {/* 수정 */}
          </div>
        ))}
      </div>
      <div>
        <h2>총 가격: {totalPrice}</h2>
      </div>
    </div>
  );
};

export default PaymentPage;
