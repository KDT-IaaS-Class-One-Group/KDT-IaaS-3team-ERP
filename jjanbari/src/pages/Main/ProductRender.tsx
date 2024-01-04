import React, { useEffect, useState } from 'react';

const SERVER_URL = 'http://localhost:3001/products';

type Product = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

const ProductRender = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch(SERVER_URL)
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, []);

  const handlePurchase = async (id: string, quantity: number) => {
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

  return (
    <div className="product-container">
      {products.length > 0 &&
        products.map((product) => (
          <div key={product.id}>
            <h2>{product.name}</h2>
            <p>가격: {product.price}</p>
            <p>수량: {product.quantity}</p>
            <input type="number" id={`quantity-${product.name}`} min="1" max={product.quantity} />
            <button onClick={() => handlePurchase(product.name, Number((document.getElementById(`quantity-${product.name}`) as HTMLInputElement).value))}>구매</button>
          </div>
        ))}
    </div>
  );
};

export default ProductRender;
