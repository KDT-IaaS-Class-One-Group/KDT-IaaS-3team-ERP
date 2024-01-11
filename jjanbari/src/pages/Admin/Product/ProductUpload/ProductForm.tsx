import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ProductForm = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState<number>(0); // 가격을 숫자로만 관리
  const [quantity, setQuantity] = useState<number>(0);
  const [image, setImage] = useState<File | null>(null);

  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!name || price <= 0 || quantity <= 0 || !image) {
      alert('모든 필드를 채워주세요.');
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price.toString());
    formData.append('quantity', quantity.toString());
    formData.append('image', image);

    try {
      const response = await fetch('http://localhost:3001/addProductWithImage', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert('상품이 성공적으로 등록되었습니다.');
        navigate('/main');
      } else {
        throw new Error('상품 등록 실패');
      }
    } catch (error) {
      console.error('제품 등록 중 에러 발생:', error);
      alert('상품 등록 중 에러가 발생했습니다.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">상품명:</label>
      <br />
      <input type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} />
      <br />
      <label htmlFor="price">가격:</label>
      <br />
      <input type="number" id="price" name="price" value={price} onChange={(e) => setPrice(+e.target.value)} />
      <br />
      <label htmlFor="quantity">수량:</label>
      <br />
      <input type="number" id="quantity" name="quantity" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} />
      <br />
      <label htmlFor="image">이미지:</label>
      <br />
      <input type="file" id="image" name="image" onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)} />
      <br />
      <input type="submit" value="상품 등록" />
    </form>
  );
};

export default ProductForm;
