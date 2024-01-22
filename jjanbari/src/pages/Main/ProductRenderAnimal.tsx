// ProductRenderAnimal.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { isLoggedIn } from '../../Layout/Header/User/HeaderPages/LoginStatus/isLoggedIn';
import ProductFilter from './ProductFilter';
import { Product } from '../interface/interface';

type OnFilterChange = (ageIds: number[] | null, functionalIds: number[] | null) => void;

const ProductRenderAnimal = ({ category }: { category: 'dog' | 'cat' }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const navigate = useNavigate();

  const fetchFilteredProducts: OnFilterChange = (ageId, functionalId) => {
    let url = `/products/${category}`;
    if (ageId !== null && functionalId !== null) {
      url += `/${ageId}/${functionalId}`;
    }
    
    // 사용자가 선택한 조건을 이용하여 상품 필터링
    fetch(url)
      .then((response) => response.json())
      .then((data) => setProducts(data));
  };

  useEffect(() => {
    fetchFilteredProducts(null, null); // 초기 로딩 시에는 필터 없이 전체 상품을 가져옴
  }, [category]);

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
    <div>
      <h2>{category === 'dog' ? '강아지' : '고양이'} 페이지</h2>
      <ProductFilter onFilterChange={fetchFilteredProducts} />
      <div className="product-container">
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
    </div>
  );
};

export default ProductRenderAnimal;
