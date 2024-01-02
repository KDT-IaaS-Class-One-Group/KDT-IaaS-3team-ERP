import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

type Product = {
  id: string;
  name: string;
  price: string;
  quantity: string;
};

const MainPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/products')
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, []);

  const goToLogin = () => {
    navigate('/login');
  };

  const goToSignup = () => {
    navigate('/signup');
  };

  return (
    <div>
      <h1>환영합니다!</h1>
      <button onClick={goToLogin}>로그인</button>
      <button onClick={goToSignup}>회원가입</button>
      {products.length > 0 &&
        products.map((product) => (
          <div key={product.id}>
            <h2>{product.name}</h2>
            <p>가격: {product.price}</p>
            <p>수량: {product.quantity}</p>
          </div>
        ))}
    </div>
  );
};

export default MainPage;
