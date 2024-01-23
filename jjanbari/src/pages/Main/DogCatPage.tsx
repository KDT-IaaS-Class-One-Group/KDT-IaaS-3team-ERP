// DogCatPage.tsx

import React from 'react';
import ProductRenderAnimal from './ProductRenderAnimal';

const DogPage = () => {
  return (
    <div id="container">
      <h2>강아지 페이지</h2>
      <ProductRenderAnimal category="dog" />
    </div>
  );
};

const CatPage = () => {
  return (
    <div id="container">
      <h2>고양이 페이지</h2>
      <ProductRenderAnimal category="cat" />
    </div>
  );
};

export { DogPage, CatPage };
