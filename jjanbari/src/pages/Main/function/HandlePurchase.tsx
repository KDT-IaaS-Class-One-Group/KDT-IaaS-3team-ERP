// src/pages/Main/function/HandlePurchase.tsx
import { Product } from "../../interface/interface";

const handlePurchase = async (selectedProduct: Product, setSelectedProduct: React.Dispatch<React.SetStateAction<Product | undefined>>, userId: string | null): Promise<boolean> => {
  if (!selectedProduct.product_id) {
    alert('상품 ID가 없습니다');
    return false;
  }

  try {
    const response = await fetch(`/products/purchase/${selectedProduct.product_id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ quantity: selectedProduct.quantity, userId: userId }),
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
