// src/pages/Payment/PaymentPage.tsx

import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import handlePurchase from '../function/HandlePurchase';
import { User, Product } from '../../interface/interface';
import { useAuth } from '../../../Auth/AuthContext';

type CartItem = {
  product_id: number;
  name: string;
  quantity: number;
  price: number;
};

const PaymentPage = () => {
  const [address, setAddress] = useState('');
  const [detailAddress, setDetailAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [user, setUser] = useState<User | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>(undefined);
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

    const selectedProductFromState = location.state?.selectedProduct as Product | undefined;
    if (selectedProductFromState) {
      setSelectedProduct(selectedProductFromState);
      setCartItems([{ ...selectedProductFromState }]);
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
          const userId = sessionStorage.getItem('user_id');
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

  return (
    <div id="container">
      <h1>결제 페이지</h1>
      <div>
        {selectedProduct ? (
          <div>
            <img src={selectedProduct.img} alt={selectedProduct.name} style={{ width: '100px', height: '100px' }} />
            <h3>{selectedProduct.name}</h3>
            <p>가격: {selectedProduct.price}</p>
            <p>수량: {selectedProduct.quantity}</p>
          </div>
        ) : null}
        <div>
          <h2>총 가격: {selectedProduct ? selectedProduct.price * selectedProduct.quantity : 0}</h2>
          <button onClick={handleBuy}>결제하기</button>
        </div>
        <h2>배송 정보</h2>
        <label>주소: </label>
        <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
        <br />
        <label>상세주소: </label>
        <input type="text" value={detailAddress} onChange={(e) => setDetailAddress(e.target.value)} />
        <br />
        <label>연락처: </label>
        <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
      </div>
    </div>
  );
};

export default PaymentPage;
