import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CategoryOption from '../category/CategoryOption';

const ProductForm = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState<number>(0); // 가격을 숫자로만 관리
  const [quantity, setQuantity] = useState<number>(0);
  const [image, setImage] = useState<File | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [options, setOptions] = useState<{ id: number; name: string }[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (selectedCategory) {
      // 서버에서 선택한 카테고리에 해당하는 옵션 가져오기
      const fetchOptions = async () => {
        try {
          const response = await fetch(`http://localhost:3001/getOptionsByCategory/${selectedCategory}`);
          if (response.ok) {
            const data = await response.json();
            setOptions(data);
          } else {
            throw new Error('옵션 정보 가져오기 실패');
          }
        } catch (error) {
          console.error('옵션 정보 가져오기 중 에러 발생:', error);
          alert('옵션 정보를 가져오는 중 에러가 발생했습니다.');
        }
      };

      fetchOptions();
    }
  }, [selectedCategory]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!name || price <= 0 || quantity <= 0) {
      alert('상품명, 가격 및 수량, 카테고리를 모두 채워주세요.');
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price.toString());
    formData.append('quantity', quantity.toString());

    // 이미지가 있는 경우에만 formData에 추가
    if (image) {
      formData.append('image', image);
    }

    try {
      const response = await fetch('http://localhost:3001/addProductWithImage', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert('상품이 성공적으로 등록되었습니다.');
        navigate('/');
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
      <input
        type="number"
        id="quantity"
        name="quantity"
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      />
      <br />
      <label htmlFor="category">카테고리:</label>
      <br />
      <select
        id="category"
        name="category"
        onChange={(e) => {
          setSelectedCategory(e.target.value);
          setOptions([]); // 카테고리가 변경되면 옵션 초기화
        }}
        aria-label="카테고리 선택"
      >
        <option value="">카테고리 선택</option>
        <option value="animal">동물</option>
        <option value="age">나이</option>
        <option value="functional">기능</option>
      </select>
      <br />
      <label htmlFor="option">옵션:</label>
      <br />
      <select id="option" name="option">
        <option value={0}>옵션 선택</option>
        {options.map((option) => (
          <CategoryOption key={option.id} id={option.id} name={option.name} />
        ))}
      </select>
      <br />
      <label htmlFor="image">이미지 (선택 사항):</label> {/* 선택 사항임을 명시 */}
      <br />
      <input
        type="file"
        id="image"
        name="image"
        onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
      />
      <br />
      <input type="submit" value="상품 등록" />
    </form>
  );
};

export default ProductForm;
