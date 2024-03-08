import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartItem } from '../../interface/interface';
import { useAuth } from '../../../Auth/AuthContext'; // AuthContext import

const CartPage = () => {
  const { state: authState } = useAuth(); // 사용자 정보 가져오기
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const API_URL = process.env.REACT_APP_API_URL;
    const userId = authState.user?.username; // 사용자 ID 가져오기

    if (userId) {
      fetch(`${API_URL}/cart/${userId}`)
        .then((response) => response.json())
        .then((data) => {
          if (Array.isArray(data)) {
            setCartItems(
              data.map((item) => ({
                product_id: item.product_id,
                name: item.name,
                img: item.img,
                quantity: item.quantity,
                price: item.price,
              }))
            );
            calculateTotalPrice(data);
          } else {
            console.error('장바구니 데이터가 배열 형식이 아닙니다:', data);
          }
        })
        .catch((error) => {
          console.error('장바구니 데이터 로딩 중 오류 발생:', error);
        });
    }
  }, [authState.user]); // useEffect의 의존성 배열에 authState.user 추가

  const calculateTotalPrice = (items: CartItem[]) => {
    let sum = 0;
    for (let item of items) {
      sum += item.price * item.quantity;
    }
    setTotalPrice(sum);
  };
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>, productId: number) => {
    const API_URL = process.env.REACT_APP_API_URL;
    const newQuantity = Number(e.target.value);
    const userId = authState.user?.username; // 수정된 부분

    if (userId) {
      fetch(`${API_URL}/cart/${userId}/${productId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cart_quantity: newQuantity }),
      })
        .then((response) => response.json())
        .then(() => {
          const updatedItems = cartItems.map((item) => (item.product_id === productId ? { ...item, cart_quantity: newQuantity } : item));
          setCartItems(updatedItems);
          calculateTotalPrice(updatedItems);
        });
    }
  };

  const handleDeleteClick = (productId: number) => {
    const API_URL = process.env.REACT_APP_API_URL;
    const userId = authState.user?.username; // 수정된 부분
    if (userId) {
      fetch(`${API_URL}/cart/${userId}/${productId}`, {
        method: 'DELETE',
      })
        .then((response) => response.json())
        .then(() => {
          const updatedItems = cartItems.filter((item) => item.product_id !== productId);
          setCartItems(updatedItems);
          calculateTotalPrice(updatedItems);
        });
    }
  };

  const handleCheckoutClick = () => {
    navigate('/payment', { state: { cartItems } });
  };

  return (
    <div id="container">
      <div className="cart-page">
        <h1>장바구니</h1>
        <div className="cart-list">
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <div className="cart-item" key={item.product_id}>
                <img className="image" src={item.img || 'placeholder.jpg'} alt={item.name || '이미지 없음'} />
                <div className="cart-item-details">
                  <h3>{item.name}</h3>
                  <p>가격: {item.price}</p>
                  <p>수량: {item.quantity}</p>
                  <input type="number" value={item.quantity} min="1" max={item.quantity} onChange={(e) => handleQuantityChange(e, item.product_id)} />
                  <button onClick={() => handleDeleteClick(item.product_id)}>삭제</button>
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
    </div>
  );
};
export default CartPage;
