// src/pages/Admin/ProductForm.tsx

import React, { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";

interface ProductFormData {
  name: string;
  price: number;
  quantity: number;
}

const ProductForm: React.FC = () => {
  const navigate = useNavigate();

  const [productFormData, setProductFormData] = useState<ProductFormData>({
    name: "",
    price: 0,
    quantity: 0,
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // 숫자 필드에 대한 유효성 검사
    const parsedValue = name === "price" || name === "quantity" ? parseFloat(value) : value;

    setProductFormData({
      ...productFormData,
      [name]: parsedValue,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 필수 필드 확인
    if (!productFormData.name || productFormData.price <= 0 || productFormData.quantity <= 0) {
      alert("상품명, 가격, 수량을 올바르게 입력해주세요.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/add-product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productFormData),
      });

      if (response.ok) {
        console.log("상품 등록 성공");
        navigate("/main");
      } else {
        console.error("상품 등록 실패:", response.statusText);
        alert("상품 등록에 실패했습니다. 다시 시도해주세요.");
      }
    } catch (error) {
      console.error("상품 등록 실패:", error);
      alert("상품 등록에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div>
      <h2>상품 등록</h2>
      <form onSubmit={handleSubmit} className="ProductForm">
        <label>
          상품명:
          <input
            type="text"
            name="name"
            value={productFormData.name}
            onChange={handleInputChange}
            required
          />
        </label>
        <br />
        <label>
          가격:
          <input
            type="number"
            name="price"
            value={productFormData.price}
            onChange={handleInputChange}
            required
          />
        </label>
        <br />
        <label>
          수량:
          <input
            type="number"
            name="quantity"
            value={productFormData.quantity}
            onChange={handleInputChange}
            required
          />
        </label>
        <br />
        <button type="submit">상품 등록</button>
      </form>
    </div>
  );
};

export default ProductForm;
