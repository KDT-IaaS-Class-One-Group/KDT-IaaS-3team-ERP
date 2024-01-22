import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { isLoggedIn } from '../../Layout/Header/User/HeaderPages/LoginStatus/isLoggedIn';
import { Product, Category } from '../interface/interface';

const ProductRenderAnimal = ({ category }: { category: 'dog' | 'cat' }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [ageFilter, setAgeFilter] = useState<string | null>(null);
  const [functionalFilter, setFunctionalFilter] = useState<string | null>(null);
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
    // ageFilter와 functionalFilter를 쿼리 파라미터로 추가하여 서버에 전송합니다.
    const queryParams = new URLSearchParams();
    if (ageFilter) queryParams.append('age', ageFilter);
    if (functionalFilter) queryParams.append('functional', functionalFilter);

    fetch(`/products/${category}?${queryParams.toString()}`)
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, [category, ageFilter, functionalFilter]);

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
        <select onChange={(e) => setAgeFilter(e.target.value)}>
          <option value="">전체</option>
          {/* 나이 카테고리 옵션을 동적으로 생성합니다. */}
          {ageCategories.map((age) => (
            <option key={age.age_id} value={age.age_id}>
              {age.age_name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>기능:</label>
        <select onChange={(e) => setFunctionalFilter(e.target.value)}>
          <option value="">전체</option>
          {/* 기능 카테고리 옵션을 동적으로 생성합니다. */}
          {functionalCategories.map((functional) => (
            <option key={functional.functional_id} value={functional.functional_id}>
              {functional.functional_name}
            </option>
          ))}
        </select>
      </div>
      {products.length > 0 &&
        products.map((product) => (
          <div className="product-item" key={product.product_id}>
            <img src={product.img} alt={product.name} />
            <div className='product-details'>
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
}

export default ProductRenderAnimal;
