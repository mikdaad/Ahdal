"use client";
import React, { useState } from "react";

interface PricingDetailsProps {
  totalPrice: number;
  originalprice: number;
  setstep: (step: number) => void;
  step: number;
}

export default function PricingDetails({
  totalPrice,
  originalprice,
  setstep,
  step,
}: PricingDetailsProps) {
  const [couponCode, setCouponCode] = useState("");
  const [showCouponInput, setShowCouponInput] = useState(false);

  // Avoid division by zero if originalprice is 0
  const discountAmount = originalprice > 0 ? originalprice - totalPrice : 0;
  const discountPercent =
    originalprice > 0 ? Math.round((discountAmount / originalprice) * 100) : 0;

  const handleApplyCoupon = () => {
    // Add logic here to actually validate/apply the coupon if needed
    console.log("Applying coupon:", couponCode);
    setShowCouponInput(!showCouponInput);
    // Maybe reset coupon code after submission attempt
    // setCouponCode("");
  };

  return (
    // Main Container - Mobile first padding, increase on larger screens
    <div className="border border-[color:var(--Button-color,#ffffff)] shadow-[0px_1px_0px_0px_rgba(255,255,255,0.08)_inset] bg-[rgba(255,255,255,0.02)] flex w-full flex-col overflow-hidden mx-auto p-4 sm:p-5 md:p-6 rounded-lg md:rounded-2xl border-solid max-w-full">

      {/* Pricing Breakdown - Single list using flex justify-between per line */}
      {/* Responsive text size and spacing */}
      <div className="space-y-2 md:space-y-2.5 text-sm md:text-base text-white">
        {/* Subtotal Row */}
        <div className="flex justify-between items-center">
          <span className="font-normal text-gray-300">Sub total</span>
          <span className="font-medium text-white">₹{originalprice}</span>
        </div>
        {/* Discount Row */}
        <div className="flex justify-between items-center">
          <span className="font-normal text-gray-300">
            Discount ({discountPercent}%)
          </span>
          <span className="font-medium text-white">-₹{discountAmount}</span>
        </div>
        {/* Savings Row */}
        <div className="flex justify-between items-center">
          <span className="font-semibold text-[rgba(26,255,52,1)]">
            Total Saving
          </span>
          <span className="font-semibold text-[rgba(26,255,52,1)]">
            ₹{discountAmount}
          </span>
        </div>
        {/* Shipping Row */}
        <div className="flex justify-between items-center">
          <span className="font-normal text-gray-300">Shipping (Free)</span>
          <span className="font-medium text-white">₹0</span>
        </div>
      </div>

      {/* Coupon Section - Adjusted padding/text size */}
      <div className="bg-[rgba(217,217,217,0.09)] flex items-center gap-3 text-white justify-between mt-4 md:mt-6 px-3 py-3 sm:px-4 rounded-lg">
        {showCouponInput ? (
          <input
            type="text"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            placeholder="Enter coupon code"
            className="bg-transparent border-b border-white/50 outline-none text-xs sm:text-sm font-light flex-1 py-1 placeholder-gray-400"
          />
        ) : (
          <div className="text-xs sm:text-sm font-light text-gray-300">
            Have a coupon code?
          </div>
        )}
        <button
          onClick={handleApplyCoupon}
          // Adjusted text size and padding implicitly via font size
          className="text-sm sm:text-base font-medium hover:text-[rgba(232,175,82,1)] transition-colors flex-shrink-0"
        >
          {showCouponInput ? "Submit" : "Apply"} {/* Shortened text */}
        </button>
      </div>

      {/* Separator - Adjusted margin and color */}
      <div className="border-t border-white/20 h-px my-4 sm:my-5 md:my-6" />

      {/* Final Total Section - Adjusted text size and alignment */}
      <div className="flex items-end justify-between gap-4">
        {" "}
        {/* Align items end to vertically align Sub-Total text with price */}
        <div className="text-white text-base sm:text-lg md:text-xl font-medium tracking-wide">
          Sub-Total
        </div>
        <div className="flex flex-col items-end">
          {" "}
          {/* Align price and button to the right */}
          <div className="text-white text-lg sm:text-xl md:text-2xl font-medium leading-none tracking-wide">
            ₹{totalPrice}
          </div>
          {/* Checkout Button - Adjusted padding/text size */}
          <button
            onClick={() => setstep(step + 1)}
            // Responsive padding and text size, ensure min-h-0 to prevent extra height
            className="bg-[rgba(218,175,80,1)] min-h-0 text-sm md:text-base text-black font-semibold text-center mt-3 md:mt-4 px-5 py-2 sm:px-6 sm:py-2.5 md:px-8 md:py-3 rounded-md md:rounded-lg hover:bg-[rgba(232,185,92,1)] transition-colors"
          >
            Check Out Now
          </button>
        </div>
      </div>
    </div>
  );
}