import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface AnimalCategory {
  animal_id: number;
  animal_name: string;
}

interface AgeCategory {
  age_id: number;
  age_name: string;
}

interface FunctionalCategory {
  functional_id: number;
  functional_name: string;
}

const ProductForm = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState<number>(0); // 가격을 숫자로만 관리
  const [quantity, setQuantity] = useState<number>(0);
  const [image, setImage] = useState<File | null>(null);

  const [animalCategories, setAnimalCategories] = useState<AnimalCategory[]>([]);
  const [ageCategories, setAgeCategories] = useState<AgeCategory[]>([]);
  const [functionalCategories, setFunctionalCategories] = useState<FunctionalCategory[]>([]);

  const [selectedAnimalCategory, setSelectedAnimalCategory] = useState('');
  const [selectedAgeCategory, setSelectedAgeCategory] = useState('');
  const [selectedFunctionalCategory, setSelectedFunctionalCategory] = useState('');

  const navigate = useNavigate();

  const fetchCategories = async () => {
    try {
      const response = await fetch('http://localhost:3001/categories');
      const data = await response.json();

      setAnimalCategories(data.animalCategories);
      setAgeCategories(data.ageCategories);
      setFunctionalCategories(data.functionalCategories);
    } catch (error) {
      console.error('카테고리 데이터를 불러오는 중 에러 발생:', error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    console.log('name:', name);
    console.log('price:', price);
    console.log('quantity:', quantity);
    console.log('selectedAnimalCategory:', selectedAnimalCategory);
    console.log('selectedAgeCategory:', selectedAgeCategory);
    console.log('selectedFunctionalCategory:', selectedFunctionalCategory);
    console.log('image:', image);

    if (!name || price <= 0 || quantity <= 0) {
      alert('상품명, 가격 및 수량을 채워주세요.');
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price.toString());
    formData.append('quantity', quantity.toString());
    formData.append('animalCategory', selectedAnimalCategory !== undefined ? String(selectedAnimalCategory) : '');
    formData.append('ageCategory', selectedAgeCategory !== undefined ? String(selectedAgeCategory) : '');
    formData.append(
      'functionalCategory',
      selectedFunctionalCategory !== undefined ? String(selectedFunctionalCategory) : ''
    );

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
      <label htmlFor="image">이미지 (선택 사항):</label> {/* 선택 사항임을 명시 */}
      <br />
      <input
        type="file"
        id="image"
        name="image"
        onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
      />
      <br />
      <label htmlFor="animalCategory">동물 종류:</label>
      <br />
      <select
        id="animalCategory"
        name="animalCategory"
        value={selectedAnimalCategory}
        onChange={(e) => setSelectedAnimalCategory(e.target.value)}
      >
        {animalCategories.map((category) => (
          <option key={category.animal_id} value={category.animal_id}>
            {category.animal_name}
          </option>
        ))}
      </select>
      <br />
      <label htmlFor="ageCategory">나이대:</label>
      <br />
      <select
        id="ageCategory"
        name="ageCategory"
        value={selectedAgeCategory}
        onChange={(e) => setSelectedAgeCategory(e.target.value)}
      >
        {ageCategories.map((category) => (
          <option key={category.age_id} value={category.age_id}>
            {category.age_name}
          </option>
        ))}
      </select>
      <br />
      <label htmlFor="functionalCategory">기능성:</label>
      <br />
      <select
        id="functionalCategory"
        name="functionalCategory"
        value={selectedFunctionalCategory}
        onChange={(e) => setSelectedFunctionalCategory(e.target.value)}
      >
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
