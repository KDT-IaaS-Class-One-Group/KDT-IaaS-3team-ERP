// src/components/ProductForm.tsx

import React, { useState, ChangeEvent, FormEvent } from "react";

interface ProductFormProps {
  onSubmit: (formData: any) => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ onSubmit }) => {
  const [productData, setProductData] = useState({
    name: "",
    price: "",
    quantity: "",
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProductData({
      ...productData,
      [name]: value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // 여기서 유효성 검사 등을 수행할 수 있습니다.

    // onSubmit을 호출하여 부모 컴포넌트로 데이터 전달
    onSubmit(productData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        상품명:
        <input
          type="text"
          name="name"
          value={productData.name}
          onChange={handleInputChange}
          required
        />
      </label>
      <br />
      <label>
        가격:
        <input
          type="text"
          name="price"
          value={productData.price}
          onChange={handleInputChange}
          required
        />
      </label>
      <br />
      <label>
        수량:
        <input
          type="text"
          name="quantity"
          value={productData.quantity}
          onChange={handleInputChange}
          required
        />
      </label>
      <br />
      <button type="submit">상품 등록</button>
    </form>
  );
};

export default ProductForm;
