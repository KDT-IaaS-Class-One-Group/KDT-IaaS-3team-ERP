// src/Component/Container/Container.tsx

import "./Container.css";

const Container = () => {
  return (
    <div id="container">
      {/* 상품 목록 렌더링하는 영역 */}
      <div className="productList"></div>
    </div>
  );
};

export default Container;
