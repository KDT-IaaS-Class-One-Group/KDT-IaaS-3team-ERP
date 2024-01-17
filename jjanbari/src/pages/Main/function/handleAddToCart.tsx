// src/pages/Main/function/handleAddToCart.tsx

import { NavigateFunction } from 'react-router-dom';
import { isLoggedIn } from '../../../Layout/Header/User/HeaderPages/LoginStatus/isLoggedIn';

type Product = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  img: string;
};

const handleAddToCart = async (product: Product, navigate: NavigateFunction) => {
  // 선택한 수량을 가져옵니다.
  const selectedQuantity = Number((document.getElementById(`quantity-${product.name}`) as HTMLInputElement).value);

  // 선택한 수량을 포함한 새로운 상품 객체를 생성합니다.
  const selectedProduct = { ...product, quantity: selectedQuantity };

  if (isLoggedIn()) {
    try {
      // 장바구니에 상품을 추가하는 API를 호출합니다.
      const response = await fetch('http://localhost:3001/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(selectedProduct), // 선택한 상품의 정보를 전달합니다.
      });

      if (!response.ok) {
        throw new Error('장바구니에 상품을 추가하는데 실패했습니다.');
      }

      alert('장바구니에 상품이 추가되었습니다.');
      navigate('/cart'); // 장바구니 페이지로 이동합니다.
    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        // 타입 가드를 사용하여 error의 타입을 확인합니다.
        alert(error.message); // error가 Error 타입이라는 것을 TypeScript가 알 수 있습니다.
      }
    }
  } else {
    navigate('/login');
  }
};

export default handleAddToCart;
