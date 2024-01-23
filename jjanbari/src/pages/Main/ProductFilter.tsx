import React, { useState } from 'react';
type OnFilterChange = (ageId: number[] | null, functionalId: number[] | null) => void;

const ProductFilter = ({onFilterChange}: {onFilterChange: OnFilterChange}) => {
  const [ageChecked, setAgeChecked] = useState<number[] | null>(null);
  const [functionalChecked, setFunctionalChecked] = useState<number[] | null>(null);

  const handleAgeChange = (ageId: number) => {
    setAgeChecked((prevAgeChecked) => {
      if (prevAgeChecked === null) {
        // 이 부분에서 초기화되었을 때 배열로 만듭니다.
        return [ageId];
      }

      if (prevAgeChecked.includes(ageId)) {
        return prevAgeChecked.filter((id) => id !== ageId);
      } else {
        return [...prevAgeChecked, ageId];
      }
    });
  };

  const handleFunctionalChange = (functionalId: number) => {
    setFunctionalChecked((prevFunctionalChecked) => {
      if (prevFunctionalChecked === null) {
        // 이 부분에서 초기화되었을 때 배열로 만듭니다.
        return [functionalId];
      }

      if (prevFunctionalChecked.includes(functionalId)) {
        return prevFunctionalChecked.filter((id) => id !== functionalId);
      } else {
        return [...prevFunctionalChecked, functionalId];
      }
    });
  };

  const applyFilters = () => {
    if (ageChecked !== null && functionalChecked !== null) {
        // 배열 형태의 값이 필요한 경우
        onFilterChange(ageChecked, functionalChecked);
    } else {
      onFilterChange(null, null);
    }
};

  return (
    <div>
      <h3>나이 필터</h3>
      <label>
        <input
          type="checkbox"
          checked={ageChecked !== null && ageChecked.includes(1)}
          onChange={() => handleAgeChange(1)}
        />
        퍼피
      </label>
      <label>
      <input
          type="checkbox"
          checked={ageChecked !== null && ageChecked.includes(2)}
          onChange={() => handleAgeChange(2)}
        />
        어덜트(강아지)
      </label>
      <label>
      <input
          type="checkbox"
          checked={ageChecked !== null && ageChecked.includes(3)}
          onChange={() => handleAgeChange(3)}
        />
        키튼
      </label>
      <label>
      <input
          type="checkbox"
          checked={ageChecked !== null && ageChecked.includes(4)}
          onChange={() => handleAgeChange(4)}
        />
        어덜트(고양이)
      </label>

      <h3>기능 필터</h3>
      <label>
        <input type="checkbox" checked={functionalChecked !== null && functionalChecked.includes(1)} onChange={() => handleFunctionalChange(1)} />
        종합
      </label>
      <label>
        <input type="checkbox" checked={functionalChecked !== null && functionalChecked.includes(2)} onChange={() => handleFunctionalChange(2)} />
        기능성
      </label>

      <button onClick={applyFilters}>필터 적용</button>
    </div>
  );
};

export default ProductFilter;
