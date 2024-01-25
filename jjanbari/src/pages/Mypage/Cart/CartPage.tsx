import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartItem } from '../../interface/interface';

const CartPage = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const userId = sessionStorage.getItem('user_id');

    if (userId) {
      fetch(`http://localhost:3001/cart/${userId}`)
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
  }, []);

  const calculateTotalPrice = (items: CartItem[]) => {
    let sum = 0;
    for (let item of items) {
      sum += item.price * item.quantity;
    }
    setTotalPrice(sum);
  };
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>, productId: number) => {
    const newQuantity = Number(e.target.value);
    const userId = sessionStorage.getItem('user_id');

    if (userId) {
      fetch(`http://localhost:3001/cart/${userId}/${productId}`, {
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
    const userId = sessionStorage.getItem('user_id');
    if (userId) {
      fetch(`http://localhost:3001/cart/${userId}/${productId}`, {
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
      <h1>장바구니</h1>
      <div className="cart-page">
        <div className="cart-list">
          <div className="cart-name">
            <p> 상품 이미지 </p>
            <p> 상품 이름 </p>
            <p> 상품 가격 </p>
            <p> 상품 수량</p>
            <p>총 가격</p>
            <p>삭제</p>
          </div>
          {cartItems.length > 0 ? (
            cartItems.map((item) => {
              const itemTotalPrice = item.price * item.quantity; // 아이템별 총 가격 계산
              return (
                <div className="cart-item" key={item.product_id}>
                  <img src={item.img || 'placeholder.jpg'} className="image" alt={item.name || '이미지 없음'} />
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
                    <input type="number" value={item.quantity} min="1" max={item.quantity} onChange={(e) => handleQuantityChange(e, item.product_id)} />
                  </div>
                  <div className="cart-item-detail">
                    <p>{itemTotalPrice}</p>
                  </div>
                  <div className="cart-item-detail">
                    <button className="cart-button" onClick={() => handleDeleteClick(item.product_id)}>
                      삭제
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <p>장바구니에 담긴 상품이 없습니다.</p>
          )}
        </div>
        <div className="cart-summary">
          <p>총 가격: {totalPrice}</p>
          <button className="cart-button" onClick={handleCheckoutClick}>
            결제하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
