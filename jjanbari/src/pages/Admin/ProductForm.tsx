// src/pages/Admin/ProductForm.tsx

const ProductForm = () => {
  return (
    <form>
      <label htmlFor="name">상품명:</label>
      <br />
      <input
        type="text"
        id="name"
        name="NAME"
      />
      <br />
      <label htmlFor="price">가격:</label>
      <br />
      <input
        type="text"
        id="price"
        name="PRICE"
      />
      <br />
      <label htmlFor="quantity">수량:</label>
      <br />
      <input
        type="number"
        id="quantity"
        name="QUANTITY"
      />{" "}
      {/* 유형을 number로 변경 */}
      <br />
      <input type="submit" value="상품 등록" />
    </form>
  );
};

export default ProductForm;
