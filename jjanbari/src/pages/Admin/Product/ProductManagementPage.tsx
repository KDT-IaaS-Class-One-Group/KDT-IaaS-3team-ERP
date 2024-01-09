import { Link } from 'react-router-dom';

const ProductManagementPage = () => {
  return (
    <div id="container">
      <Link to="/productUpload">
        <h1>상품 등록</h1>
      </Link>
      <Link to="/productRemove">
        <h1>상품 제거</h1>
      </Link>
    </div>
  );
};

export default ProductManagementPage;
