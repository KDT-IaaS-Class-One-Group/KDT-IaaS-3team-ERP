// src/pages/Main/function/handleAddToCart.tsx

import { NavigateFunction } from 'react-router-dom';
import { Product } from '../../interface/interface';

const handleAddToCart = async (product: Product, navigate: NavigateFunction) => {
  const quantityInput = document.getElementById(`quantity-${product.name}`) as HTMLInputElement;

  if (!quantityInput) {
    alert('수량을 입력하는 필드를 찾을 수 없습니다.');
    return;
  }

  const selectedQuantity = Number(quantityInput.value);

  if (isNaN(selectedQuantity) || selectedQuantity <= 0) {
    alert('유효한 수량을 입력해주세요.');
    return;
  }

  const userId = 'root'; // 테스트를 위해 'root' 사용자 ID 설정

  try {
    const response = await fetch('http://localhost:3001/cart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId,
        productId: product.product_id,
        quantity: selectedQuantity,
        price: product.price,
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
};

export default handleAddToCart;
