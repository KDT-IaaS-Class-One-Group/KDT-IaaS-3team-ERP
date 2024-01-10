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
  const [editingProductId, setEditingProductId] = useState<number | null>(null);
  const [updatedProduct, setUpdatedProduct] = useState<Product | null>(null);

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
    // 해당 상품을 수정할 때는 해당 상품의 id를 state에 저장하고,
    // 폼에서 사용할 수정할 정보를 초기화합니다.
    setEditingProductId(id);
    setUpdatedProduct({ id, name: '', price: 0, quantity: 0 });
  };

  const handleUpdateSubmit = async () => {
    try {
      if (!updatedProduct) {
        return;
      }

      // Send a PUT request to the server to update the product
      const response = await fetch(`http://localhost:3001/admin/products/${updatedProduct.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedProduct),
      });

      if (response.ok) {
        // If the update is successful, update the local state
        setProducts((prevProducts) =>
          prevProducts.map((product) => (product.id === updatedProduct.id ? updatedProduct : product))
        );
        // Reset editing state
        setEditingProductId(null);
        setUpdatedProduct((prev: Product | null) => null);
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
    } catch (error: any) {
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
              <td>
                {editingProductId === product.id ? (
                  <input
                    value={updatedProduct?.name || ''}
                    onChange={(e) => setUpdatedProduct((prev) => {
                      if (prev) {
                        return { ...prev, name: e.target.value};
                      } else {
                        return null;
                      }
                    })}
                  />
                ) : (
                  product.name
                )}
              </td>
              <td>
                {editingProductId === product.id ? (
                  <input
                    value={updatedProduct?.price?.toString() || ''}
                    onChange={(e) => setUpdatedProduct((prev) => {
                      if (prev) {
                        return { ...prev, price: parseFloat(e.target.value) || 0};
                      } else {
                        return null;
                      }
                    })}
                  />
                ) : (
                  product.price
                )}
              </td>
              <td>
                {editingProductId === product.id ? (
                  <input
                    value={updatedProduct?.quantity?.toString() || ''}
                    onChange={(e) => setUpdatedProduct((prev) => {
                      if (prev) {
                        return { ...prev, quantity: parseInt(e.target.value) || 0};
                      } else {
                        return null;
                      }
                    })}
                  />
                ) : (
                  product.quantity
                )}
              </td>
              <td>
                {editingProductId === product.id ? (
                  <button onClick={handleUpdateSubmit}>확인</button>
                ) : (
                  <button onClick={() => handleUpdate(product.id)}>수정</button>
                )}
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
