import React, { useState, useEffect } from 'react';

// 상품의 타입 정의
type Product = {
  id: number;
  name: string;
  price: number;
  quantity: number;
};

const ProductUpdatePage = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/admin/products');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const data: Product[] = await response.json();
        setProducts(data);
      } catch (error: any) {
        console.error('Error fetching data:', error.message);
      }
    };

    fetchData();
  }, []);

  const handleUpdate = async (id: number) => {
    try {
      // Assume you have a form for updating product with updated values (newName, newPrice, newQuantity)
      const newName = prompt('Enter new product name:') || '';
      const newPrice = parseFloat(prompt('Enter new product price:') || '0');
      const newQuantity = parseInt(prompt('Enter new product quantity:') || '0');

      const updatedProduct = { name: newName, price: newPrice, quantity: newQuantity };

      // Send a PUT request to the server to update the product
      const response = await fetch(`http://localhost:3001/admin/products/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedProduct),
      });

      if (response.ok) {
        // If the update is successful, update the local state
        setProducts((prevProducts) =>
          prevProducts.map((product) => (product.id === id ? { ...product, ...updatedProduct } : product))
        );
      } else {
        console.error('Failed to update the product');
      }
    } catch (error: any) {
      console.error('Error during updating product:', error.message);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      // Send a DELETE request to the server to delete the product
      const response = await fetch(`http://localhost:3001/admin/products/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        // If the deletion is successful, update the local state
        setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));
      } else {
        console.error('Failed to delete the product');
      }
    } catch (error:any) {
      console.error('Error during deleting product:', error.message);
    }
  };
  
  return (
    <div id="container">
      <h1>상품 수정</h1>
      <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>상품명</th>
          <th>가격</th>
          <th>수량</th>
          <th>수정</th>
          <th>삭제</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr key={product.id}>
            <td>{product.id}</td>
            <td>{product.name}</td>
            <td>{product.price}</td>
            <td>{product.quantity}</td>
            <td>
              <button onClick={() => handleUpdate(product.id)}>수정</button>
            </td>
            <td>
              <button onClick={() => handleDelete(product.id)}>삭제</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  );
};

export default ProductUpdatePage;
