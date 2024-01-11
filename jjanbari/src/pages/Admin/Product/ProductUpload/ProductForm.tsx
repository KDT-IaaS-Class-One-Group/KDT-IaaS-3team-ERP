import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ProductForm = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [image, setImage] = useState<File | null>(null); // 이미지 상태 추가

  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!name || !price || quantity <= 0 || !image) {
      alert('모든 필드를 채워주세요.');
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);
    formData.append('quantity', quantity.toString());
    formData.append('image', image);

    try {
      const response = await fetch('http://localhost:3001/addProductWithImage', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        navigate('/admin'); // 성공 시 이동할 경로
      } else {
        throw new Error('상품 등록 실패');
      }
    } catch (error) {
      console.error('제품 등록 중 에러 발생:', error);
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
      <input type="text" id="price" name="price" value={price} onChange={(e) => setPrice(e.target.value)} />
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
