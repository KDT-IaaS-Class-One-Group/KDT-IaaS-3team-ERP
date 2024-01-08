// src/pages/Main/function/HandlePurchase.tsx

const handlePurchase = (products: any, setProducts: any) => async (id: string, quantity: number) => {
  if (!id) {
    alert('상품 ID가 없습니다');
    return;
  }

  try {
    const response = await fetch(`http://localhost:3001/products/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ quantity }),
    });

    const result = await response.json();

    if (result.success) {
      alert('구매가 완료되었습니다');
      // 상품 목록 새로고침
      fetch('/products')
        .then((response) => response.json())
        .then((data) => setProducts(data));
    } else {
      alert(result.error || '구매에 실패하였습니다');
    }
  } catch (error: any) {
    console.error('Error during purchase:', error.message);
    alert('구매에 실패하였습니다');
  }
};

export default handlePurchase;
