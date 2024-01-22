// src/pages/Main/function/handleAddToCart.tsx

import { NavigateFunction } from 'react-router-dom';
import { isLoggedIn } from '../../../Layout/Header/User/HeaderPages/LoginStatus/isLoggedIn';
import { Product } from '../../interface/interface';

const handleAddToCart = async (product: Product, navigate: NavigateFunction) => {
  const quantityInput = document.getElementById(product.name) as HTMLInputElement;
  const selectedQuantity = quantityInput ? Number(quantityInput.value) : 0;

  // 임시로 'root' 사용자 지정
  const userId = 'root';

  if (selectedQuantity > 0) {
    try {
      const response = await fetch('http://localhost:3001/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          productId: product.product_id,
          cart_quantity: selectedQuantity,
          cart_price: product.price,
        }),
      });

      if (!response.ok) {
        throw new Error('장바구니에 상품을 추가하는데 실패했습니다.');
      }

      alert('장바구니에 상품이 추가되었습니다.');
      navigate('/cart');
    } catch (error) {
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
