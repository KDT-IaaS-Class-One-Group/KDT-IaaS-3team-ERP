import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { isLoggedIn } from '../../Layout/Header/User/HeaderPages/LoginStatus/isLoggedIn';

type Product = {
  product_id: string;
  name: string;
  price: number;
  quantity: number;
  img: string;
};

const ProductRenderAnimal = ({ category }: { category: 'dog' | 'cat' }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:3001/products/${category}`)
      .then((response) => response.json())
      .then((data) => setProducts(data));
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
    <div className="product-container">
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