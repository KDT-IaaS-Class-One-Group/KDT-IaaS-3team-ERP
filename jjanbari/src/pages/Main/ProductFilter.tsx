import React, { useState } from 'react';

const ProductFilter = ({ onFilterChange }: { onFilterChange: (ageId: number[], functionalId: number[]) => void }) => {
  const [ageChecked, setAgeChecked] = useState<number[]>([]);
  const [categoryChecked, setCategoryChecked] = useState<number[]>([]);

  const handleAgeChange = (ageId: number) => {
    if (ageChecked.includes(ageId)) {
      setAgeChecked(ageChecked.filter((id) => id !== ageId));
    } else {
      setAgeChecked([...ageChecked, ageId]);
    }
  };

  const handleCategoryChange = (functionalId: number) => {
    if (categoryChecked.includes(functionalId)) {
      setCategoryChecked(categoryChecked.filter((id) => id !== functionalId));
    } else {
      setCategoryChecked([...categoryChecked, functionalId]);
    }
  };

  const applyFilters = () => {
    // 사용자가 선택한 조건을 전달하여 필터링된 상품을 요청
    onFilterChange(ageChecked, categoryChecked);
  };

  return (
    <div>
      <h3>나이 필터</h3>
      <label>
        <input type="checkbox" checked={ageChecked.includes(1)} onChange={() => handleAgeChange(1)} />
        퍼피
      </label>
      <label>
        <input type="checkbox" checked={ageChecked.includes(2)} onChange={() => handleAgeChange(2)} />
        어덜트(강아지)
      </label>
      <label>
        <input type="checkbox" checked={ageChecked.includes(3)} onChange={() => handleAgeChange(3)} />
        키튼
      </label>
      <label>
        <input type="checkbox" checked={ageChecked.includes(4)} onChange={() => handleAgeChange(4)} />
        어덜트(고양이)
      </label>

      <h3>기능 필터</h3>
      <label>
        <input type="checkbox" checked={categoryChecked.includes(1)} onChange={() => handleCategoryChange(1)} />
        종합
      </label>
      <label>
        <input type="checkbox" checked={categoryChecked.includes(2)} onChange={() => handleCategoryChange(2)} />
        기능성
      </label>

      <button onClick={applyFilters}>필터 적용</button>
    </div>
  );
};

export default ProductFilter;