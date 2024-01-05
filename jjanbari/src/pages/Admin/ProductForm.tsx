// src/pages/Admin/ProductForm.tsx

const ProductForm = () => {
  return (
    <form>
      <label>상품명:</label>
      <br />
      <input
        type="text"
        name="productNAME"
      />
      <br />
      <label>가격:</label>
      <br />
      <input
        type="number"
        name="productPRICE"
      />
      <br />
      <label>수량:</label>
      <br />
      <input
        type="number"
        name="productQUANTITY"
      />
      <br />
      <button type="submit">등록하기</button>
    </form>
  );
};

export default ProductForm;
