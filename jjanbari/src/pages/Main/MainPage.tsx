// src/pages/Main/MainPage.tsx

import ProductRender from './ProductRender';
import Header from '../../Layout/Header/User/UserHeader';

import './MainPage.css';

const MainPage = () => {
  return (
    <div id="userContainer">
      <Header />
      <div id="container">
        <h1>메인 페이지</h1>
        <ProductRender />
      </div>
    </div>
  );
};

export default MainPage;
