const addCart = async (productId: string, quantity: number, userId: string): Promise<boolean> => {
  try {
    const response = await fetch('http://localhost:3001/addToCart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ productId, quantity, userId }),
    });

    if (response.ok) {
      alert('상품이 장바구니에 추가되었습니다.');
      return true;
    } else {
      throw new Error('장바구니에 추가하지 못했습니다.');
    }
  } catch (error) {
    console.error('장바구니에 추가하는 도중 오류 발생:', error);
    alert('장바구니에 추가하는 도중 오류가 발생했습니다.');
    return false;
  }
};

export default addCart;
