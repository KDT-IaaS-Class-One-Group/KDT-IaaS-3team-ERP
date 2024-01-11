import React from "react";

interface CategoryOptionProps {
  id: number;
  name: string;
}

const CategoryOption: React.FC<CategoryOptionProps> = ({ id, name }) => (
  <option value={id}>{name}</option>
);

export default CategoryOption;