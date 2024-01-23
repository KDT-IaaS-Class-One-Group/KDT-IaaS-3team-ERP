import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { isLoggedIn } from '../../Layout/Header/User/HeaderPages/LoginStatus/isLoggedIn';
import { Product, Category } from '../interface/interface';
import handleAddToCart from './function/handleAddToCart';

const ProductRenderAnimal = ({ category }: { category: 'dog' | 'cat' }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedAges, setSelectedAges] = useState<number[]>([]);
  const [selectedFunctionals, setSelectedFunctionals] = useState<number[]>([]);
  const [ageCategories, setAgeCategories] = useState<Category[]>([]);
  const [functionalCategories, setFunctionalCategories] = useState<Category[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    // 나이와 기능 카테고리 정보를 서버에서 가져오도록 업데이트
    fetch('/categories')
      .then((response) => response.json())
      .then((data) => {
        const filteredAges = category === 'dog' ? data.ageCategories.slice(0, 2) : data.ageCategories.slice(2);
        setAgeCategories(filteredAges);
        setFunctionalCategories(data.functionalCategories);
      });
  }, [category]);

  useEffect(() => {
    // selectedAges와 selectedFunctionals를 쿼리 파라미터로 추가하여 서버에 전송합니다.
    const queryParams = new URLSearchParams();
    if (selectedAges.length > 0) queryParams.append('age', selectedAges.join(','));
    if (selectedFunctionals.length > 0) queryParams.append('functional', selectedFunctionals.join(','));

    console.log('Query parameters:', queryParams.toString());

    fetch(`/products/${category}?${queryParams.toString()}`)
      .then((response) => response.json())
      .then((data) => {
        console.log('Filtered products:', data);
        setProducts(data);
      });
  }, [category, selectedAges, selectedFunctionals]);

  const handleAgeCheckboxChange = (ageId: number) => {
    setSelectedAges((prevSelectedAges) => {
      // 만약 현재 클릭한 나이 카테고리가 이미 선택되어 있다면 모두 초기화
      if (prevSelectedAges.includes(ageId)) {
        return [];
      }
      // 현재 클릭한 나이 카테고리를 선택하고, 다른 모든 선택된 나이 카테고리를 초기화
      return [ageId];
    });
  };

  const handleFunctionalCheckboxChange = (functionalId: number) => {
    setSelectedFunctionals((prevSelectedFunctionals) => {
      // 만약 현재 클릭한 기능 카테고리가 이미 선택되어 있다면 모두 초기화
      if (prevSelectedFunctionals.includes(functionalId)) {
        return [];
      }
      // 현재 클릭한 기능 카테고리를 선택하고, 다른 모든 선택된 기능 카테고리를 초기화
      return [functionalId];
    });
  };

  const handleBuy = (product: Product) => {
    const selectedQuantity = Number((document.getElementById(`quantity-${product.name}`) as HTMLInputElement).value);
    const selectedProduct = { ...product, quantity: selectedQuantity };

    if (isLoggedIn()) {
      navigate('/payment', { state: { selectedProduct } });
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="product-container">
      <div>
        <label>나이:</label>
        {ageCategories.map((age) => (
          <div key={age.age_id}>
            <input type="checkbox" id={`age-${age.age_id}`} checked={selectedAges.includes(age.age_id)} onChange={() => handleAgeCheckboxChange(age.age_id)} />
            <label htmlFor={`age-${age.age_id}`}>{age.age_name}</label>
          </div>
        ))}
      </div>

      <div>
        <label>기능:</label>
        {functionalCategories.map((functional) => (
          <div key={functional.functional_id}>
            <input
              type="checkbox"
              id={`functional-${functional.functional_id}`}
              checked={selectedFunctionals.includes(functional.functional_id)}
              onChange={() => handleFunctionalCheckboxChange(functional.functional_id)}
            />
            <label htmlFor={`functional-${functional.functional_id}`}>{functional.functional_name}</label>
          </div>
        ))}
      </div>
      {products.length > 0 &&
        products.map((product) => (
          <div className="product-item" key={product.product_id}>
            <img src={product.img} alt={product.name} />
            <div className="product-details">
              <h3>{product.name}</h3>
              <br></br>
              <p>가격: {product.price}</p>
              <p>수량: {product.quantity}</p>
              <input type="number" id={`quantity-${product.name}`} min="1" max={product.quantity} />
              <button onClick={() => handleAddToCart(product, navigate)}>장바구니</button>
              <button>좋아요</button>
              <button onClick={() => handleBuy(product)}>구매</button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default ProductRenderAnimal;
