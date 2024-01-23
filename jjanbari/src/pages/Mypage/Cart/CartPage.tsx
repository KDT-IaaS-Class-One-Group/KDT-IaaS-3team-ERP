import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// CartItem 타입을 수정하여 product 필드 대신 직접 필요한 정보를 포함시킵니다.
type CartItem = {
  product_id: number;
  name: string;
  img: string | null;
  cart_quantity: number;
  cart_price: number;
};

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
                cart_quantity: item.cart_quantity,
                cart_price: item.cart_price,
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
      sum += item.cart_price * item.cart_quantity;
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
      <div className="cart-page">
        <h1>장바구니</h1>
        <div className="cart-list">
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <div className="cart-item" key={item.product_id}>
                <img src={item.img || 'placeholder.jpg'} alt={item.name || '이미지 없음'} />
                <div className="cart-item-details">
                  <h3>{item.name}</h3>
                  <p>가격: {item.cart_price}</p>
                  <p>수량: {item.cart_quantity}</p>
                  <input type="number" value={item.cart_quantity} min="1" max={item.cart_quantity} onChange={(e) => handleQuantityChange(e, item.product_id)} />
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
