// src/pages/Admin/ProductForm.tsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import handleSubmit from '../../function/HandleSubmit';
import imageCompression from 'browser-image-compression';

const ProductForm = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [img, setImage] = useState<File | null>(null);

  const navigate = useNavigate();
  
  const handleImageChange = async (e: any) => {
    const selectedFile = e.target.files[0];

    // 이미지 압축
    try {
      const compressedFile = await imageCompression(selectedFile, { maxSizeMB: 50 });

      setImage(compressedFile);
    } catch (error: any) {
      console.error('이미지 압축 오류:', error.message);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    
    // 이미지를 서버로 업로드하거나 다른 처리 로직을 추가할 수 있습니다.
    // handleSubmit 함수에 압축된 이미지를 전달하여 서버로 데이터 전송
    handleSubmit(name, price, quantity, img, navigate);
    e.preventDefault();
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <label htmlFor="image">이미지 업로드:</label>
      <br />
      <input type="file" id="image" name="IMG" onChange={handleImageChange} />
      <br />
      <label htmlFor="name">상품명:</label>
      <br />
      <input type="text" id="name" name="NAME" value={name} onChange={(e) => setName(e.target.value)} />
      <br />
      <label htmlFor="price">가격:</label>
      <br />
      <input type="text" id="price" name="PRICE" value={price} onChange={(e) => setPrice(e.target.value)} />
      <br />
      <label htmlFor="quantity">수량:</label>
      <br />
      <input type="number" id="quantity" name="QUANTITY" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} />
      <br />
      <input type="submit" value="상품 등록" />
    </form>
  );
};

export default ProductForm;
