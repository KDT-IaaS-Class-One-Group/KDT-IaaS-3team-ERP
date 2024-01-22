import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { isLoggedIn } from '../../Layout/Header/User/HeaderPages/LoginStatus/isLoggedIn';
import { Product, Category } from '../interface/interface';

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
        setAgeCategories(data.ageCategories);
        setFunctionalCategories(data.functionalCategories);
      });
  }, []);

  useEffect(() => {
    // Checkbox에서 선택한 카테고리에 대한 필터링을 수행
    fetch(`/products/${category}?ages=${selectedAges.join(',')}&functionals=${selectedFunctionals.join(',')}`)
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, [category, selectedAges, selectedFunctionals]);

  const handleAgeCheckboxChange = (ageId: number) => {
    setSelectedAges((prevSelectedAges) => {
      if (prevSelectedAges.includes(ageId)) {
        return prevSelectedAges.filter((selectedAge) => selectedAge !== ageId);
      } else {
        return [...prevSelectedAges, ageId];
      }
    });
  };

  const handleFunctionalCheckboxChange = (functionalId: number) => {
    setSelectedFunctionals((prevSelectedFunctionals) => {
      if (prevSelectedFunctionals.includes(functionalId)) {
        return prevSelectedFunctionals.filter((selectedFunctional) => selectedFunctional !== functionalId);
      } else {
        return [...prevSelectedFunctionals, functionalId];
      }
    });
  };
  
  console.log(handleAgeCheckboxChange);
  console.log(handleFunctionalCheckboxChange);

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
        <h4>나이 필터:</h4>
        {ageCategories.map((age) => (
          <div key={age.age_id}>
            <input
              type="checkbox"
              id={`age-${age.age_id}`}
              checked={selectedAges.includes(age.age_id)}
              onChange={() => handleAgeCheckboxChange(age.age_id)}
            />
            <label htmlFor={`age-${age.age_id}`}>{age.age_name}</label>
          </div>
        ))}
      </div>

      <div>
        <h4>기능 필터:</h4>
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
              <button onClick={() => handleBuy(product)}>구매</button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default ProductRenderAnimal;
