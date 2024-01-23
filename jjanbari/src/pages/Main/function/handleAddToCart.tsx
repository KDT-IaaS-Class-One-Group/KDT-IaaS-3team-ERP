// src/pages/Main/function/handleAddToCart.tsx

import { NavigateFunction } from 'react-router-dom';
import { Product } from '../../interface/interface';

const handleAddToCart = async (product: Product, navigate: NavigateFunction) => {
  const quantityInput = document.getElementById(`quantity-${product.product_id}`) as HTMLInputElement;
  const selectedQuantity = quantityInput ? Number(quantityInput.value) : 0;

  // 세션 스토리지에서 userId 가져오기
  const userId = sessionStorage.getItem('user_id') || 'anonymous'; // 로그인하지 않은 경우 'anonymous'

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
          name: product.name,
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
      console.error(error);
      alert('장바구니에 상품을 추가하는데 실패했습니다.');
    }
  } else {
    alert('수량을 선택해주세요.');
  }
};

export default handleAddToCart;
