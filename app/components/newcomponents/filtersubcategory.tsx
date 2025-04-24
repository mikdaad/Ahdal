import React from "react";

interface FilterSubcategoryProps {
  name: string;
  onClick?: () => void;
  isSelected?: boolean;
}

export const FilterSubcategory: React.FC<FilterSubcategoryProps> = ({
  name,
  onClick,
  isSelected = false,
}) => {
  return (
    <div
      className={`text-xs mt-3 first:mt-0 cursor-pointer transition-all ${
        isSelected ? "text-yellow-400 font-bold" : "text-white"
      }`}
      onClick={onClick}
    >
      {name}
    </div>
  );
};
