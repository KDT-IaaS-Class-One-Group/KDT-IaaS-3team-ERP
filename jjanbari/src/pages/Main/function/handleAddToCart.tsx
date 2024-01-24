// src/pages/Main/function/handleAddToCart.tsx

import { NavigateFunction } from 'react-router-dom';
import { Product } from '../../interface/interface';
import { CartItem } from '../../interface/interface';

const handleAddToCart = async (product: Product, navigate: NavigateFunction) => {
  const quantityInput = document.getElementById(`quantity-${product.name}`) as HTMLInputElement;
  const selectedQuantity = quantityInput ? Number(quantityInput.value) : 0;
  const userId = sessionStorage.getItem('user_id') || 'anonymous'; // 로그인하지 않은 경우 'anonymous'

  if (selectedQuantity > 0) {
    try {
      const cartResponse = await fetch(`http://localhost:3001/cart/${userId}`);
      const cartData: CartItem[] = await cartResponse.json();

      // 동일한 product_id를 가진 상품이 있는지 확인합니다.
      const existingItem = cartData.find((item) => item.product_id === product.product_id);

      if (existingItem) {
        // 이미 장바구니에 상품이 있을 경우, 수량만 업데이트합니다.
        const updatedQuantity = existingItem.quantity + selectedQuantity;
        await fetch(`http://localhost:3001/cart/${userId}/${product.product_id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ quantity: updatedQuantity }),
        });
      } else {
        // 장바구니에 상품이 없을 경우, 새로 추가합니다.
        await fetch('http://localhost:3001/cart', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId,
            productId: product.product_id,
            quantity: selectedQuantity,
            price: product.price,
          }),
        });
      }

      alert('장바구니에 추가 되었습니다.');
      navigate('/cart');
    } catch (error) {
      console.error(error);
      alert('장바구니 추가에 실패했습니다.');
    }
  } else {
    alert('수량을 선택해주세요.');
  }
};

export default handleAddToCart;
