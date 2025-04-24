'use client'
import React, { useState } from "react";
import { FilterSubcategory } from "./filtersubcategory";

interface FilterCategoryProps {
  name: string;
  subcategories?: string[];
  defaultExpanded?: boolean;
  onToggle?: (category: string) => void;
  selectedCategory?: string; // 👈 add selected category
}

export const FilterCategory: React.FC<FilterCategoryProps> = ({
  name,
  subcategories = [],
  defaultExpanded = false,
  onToggle,
  selectedCategory,
}) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="mt-[18px] first:mt-0">
      {subcategories.length > 0 ? (
        <>
          <div
            className="flex items-stretch gap-5 justify-between cursor-pointer"
            onClick={toggleExpand}
          >
            <div>{name}</div>
            <img
              src="https://cdn.builder.io/api/v1/image/assets/9e14ec760a13409cba0be5c570ba1763/158c51e807cda28d602328a2eecd9533b07f8d78?placeholderIfAbsent=true"
              className={`aspect-[0.64] object-contain w-[7px] shrink-0 transition-transform ${isExpanded ? "rotate-180" : ""}`}
              alt="Toggle"
            />
          </div>
          {isExpanded && (
            <div className="flex flex-col mt-5 px-[11px]">
              {subcategories.map((subcategory, index) => (
                <FilterSubcategory
                  key={index}
                  name={subcategory}
                  onClick={() => onToggle?.(subcategory)}
                  isSelected={selectedCategory === subcategory}
                />
              ))}
            </div>
          )}
        </>
      ) : (
        <div className="flex items-stretch gap-5 justify-between">
          <div>{name}</div>
          <img
            src="https://cdn.builder.io/api/v1/image/assets/9e14ec760a13409cba0be5c570ba1763/158c51e807cda28d602328a2eecd9533b07f8d78?placeholderIfAbsent=true"
            className="aspect-[0.64] object-contain w-[7px] shrink-0"
            alt="Arrow"
          />
        </div>
      )}
    </div>
  );
};
