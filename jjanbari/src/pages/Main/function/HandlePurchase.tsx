// src/pages/Main/function/HandlePurchase.tsx

type Product = {
  product_id: string;
  name: string;
  price: number;
  quantity: number;
  img: string;
};

const handlePurchase = async (selectedProduct: Product, setSelectedProduct: React.Dispatch<React.SetStateAction<Product | undefined>>): Promise<boolean> => {
  if (!selectedProduct.product_id) {
    alert('상품 ID가 없습니다');
    return false;
  }

  try {
    const response = await fetch(`http://localhost:3001/products/purchase/${selectedProduct.product_id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ quantity: selectedProduct.quantity }),
    });

    if (response.ok) {
      alert('구매가 완료되었습니다');
      setSelectedProduct(undefined); // 상품 상태 업데이트
      return true;
    } else {
      alert('구매에 실패하였습니다');
      return false;
    }
  } catch (error) {
    console.error('Error during purchase:', error);
    alert('구매에 실패하였습니다');
    return false;
  }
};

export default handlePurchase;
