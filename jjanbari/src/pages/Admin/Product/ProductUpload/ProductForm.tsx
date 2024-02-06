import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimalCategory, AgeCategory, FunctionalCategory } from '../../../interface/interface';

const ProductForm = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState<number>(0); // 가격을 숫자로만 관리
  const [quantity, setQuantity] = useState<number>(0);

  const [animalCategories, setAnimalCategories] = useState<AnimalCategory[]>([]);
  const [ageCategories, setAgeCategories] = useState<AgeCategory[]>([]);
  const [functionalCategories, setFunctionalCategories] = useState<FunctionalCategory[]>([]);

  const [selectedAnimalCategory, setSelectedAnimalCategory] = useState('');
  const [selectedAgeCategory, setSelectedAgeCategory] = useState('');
  const [selectedFunctionalCategory, setSelectedFunctionalCategory] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    // 페이지가 로드될 때 카테고리 목록을 불러오는 API 호출
    const fetchCategories = async () => {
      try {
        const response = await fetch('/categories');
        const data = await response.json();

        setAnimalCategories(data.animalCategories);
        setAgeCategories(data.ageCategories);
        setFunctionalCategories(data.functionalCategories);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!name || price <= 0 || quantity <= 0) {
      alert('상품명, 가격 및 수량을 채워주세요.');
      return;
    }

    const productData = {
      name,
      price,
      quantity,
      animalCategory: selectedAnimalCategory,
      ageCategory: selectedAgeCategory,
      functionalCategory: selectedFunctionalCategory,
    };

    try {
      const response = await fetch('http://localhost:3001/addProductWithImage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
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
      <input type="number" id="quantity" name="quantity" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} />

      <br />
      <label htmlFor="animalCategory">동물 카테고리:</label>
      <br />
      <select id="animalCategory" name="animalCategory" value={selectedAnimalCategory} onChange={(e) => setSelectedAnimalCategory(e.target.value)}>
        <option value="">선택하세요</option>
        {animalCategories.map((category) => (
          <option key={category.animal_id} value={category.animal_id}>
            {category.animal_name}
          </option>
        ))}
      </select>
      <br />
      <label htmlFor="ageCategory">나이대 카테고리:</label>
      <br />
      <select id="ageCategory" name="ageCategory" value={selectedAgeCategory} onChange={(e) => setSelectedAgeCategory(e.target.value)}>
        <option value="">선택하세요</option>
        {ageCategories.map((category) => (
          <option key={category.age_id} value={category.age_id}>
            {category.age_name}
          </option>
        ))}
      </select>
      <br />
      <label htmlFor="functionalCategory">기능성 카테고리:</label>
      <br />
      <select id="functionalCategory" name="functionalCategory" value={selectedFunctionalCategory} onChange={(e) => setSelectedFunctionalCategory(e.target.value)}>
        <option value="">선택하세요</option>
        {functionalCategories.map((category) => (
          <option key={category.functional_id} value={category.functional_id}>
            {category.functional_name}
          </option>
        ))}
      </select>
      <br />
      <input type="submit" value="상품 등록" />
    </form>
  );
};

export default ProductForm;
