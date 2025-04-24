import React from "react";

interface PriceDisplayProps {
  originalPrice: number;
  discountedPrice: number;
}

const PriceDisplay: React.FC<PriceDisplayProps> = ({
  originalPrice,
  discountedPrice,
}) => {
  return (
    <div className="flex items-stretch gap-[5px] whitespace-nowrap">
      <div className="text-[rgba(121,121,121,1)] text-xs lg:text-sm font-thin line-through grow">
      ₹{originalPrice}
      </div>
      <div className="text-white text-xs lg:text-sm font-medium">₹{discountedPrice}</div>
    </div>
  );
};

export default PriceDisplay;
