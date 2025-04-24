'use client'
import React, { useState } from "react";

const OrderSummary: React.FC = () => {
  const [couponCode, setCouponCode] = useState("");
  const [showCouponInput, setShowCouponInput] = useState(false);

  const handleApplyCoupon = () => {
    if (showCouponInput) {
      console.log("Applying coupon:", couponCode);
      // Here you would validate and apply the coupon
      setCouponCode("");
      setShowCouponInput(false);
    } else {
      setShowCouponInput(true);
    }
  };

  const handleCheckout = () => {
    console.log("Proceeding to checkout");
    // Here you would navigate to the payment page
  };

  return (
    <div className="justify-center items-stretch border border-[color:var(--Button-color,#E8AF52)] shadow-[0px_1px_0px_0px_rgba(255,255,255,0.08)_inset] bg-[rgba(255,255,255,0.02)] flex w-full flex-col overflow-hidden mt-[5px] mx-auto p-[25px] rounded-2xl border-solid max-md:max-w-full max-md:mt-[27px] max-md:px-5">
      <div className="max-md:max-w-full">
        <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
          <div className="w-[77%] max-md:w-full max-md:ml-0">
            <div className="flex grow flex-col text-base text-white font-normal max-md:mt-10">
              <div>Sub total</div>
              <div className="tracking-[0.48px] mt-4">Discount (30%)</div>
              <div className="text-[rgba(26,255,52,1)] font-semibold tracking-[0.48px] mt-4">
                Total Saving
              </div>
              <div className="tracking-[0.48px] self-stretch mt-4">
                Shipping and Handling(Free)
              </div>
            </div>
          </div>
          <div className="w-[23%] ml-5 max-md:w-full max-md:ml-0">
            <div className="grow text-base whitespace-nowrap text-right tracking-[0.48px] max-md:mt-10">
              <div className="text-white font-medium">₹20000</div>
              <div className="text-white font-medium mt-4">-₹10000</div>
              <div className="flex flex-col mt-4 pl-[13px]">
                <div className="text-[rgba(26,255,52,1)] font-semibold">
                  ₹900
                </div>
                <div className="text-white font-medium mt-4">₹0</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[rgba(217,217,217,0.09)] flex items-stretch gap-5 text-white justify-between mt-6 px-4 py-[17px] rounded-lg max-md:max-w-full">
        {showCouponInput ? (
          <input
            type="text"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            placeholder="Enter coupon code"
            className="text-sm font-light bg-transparent border-b border-white outline-none flex-grow"
            autoFocus
          />
        ) : (
          <div className="text-sm font-light">Have a coupon code ?</div>
        )}
        <button
          onClick={handleApplyCoupon}
          className="text-base font-semibold cursor-pointer hover:text-[rgba(232,175,82,1)] transition-colors"
        >
          Apply now
        </button>
      </div>
      <div className="border shrink-0 h-px mt-[23px] border-white border-solid max-md:max-w-full" />
      <div className="flex items-stretch gap-5 text-2xl text-white font-normal whitespace-nowrap tracking-[0.72px] leading-none justify-between mt-4 max-md:max-w-full">
        <div>Sub-Total</div>
        <div>₹10000</div>
      </div>
      <button
        onClick={handleCheckout}
        className="bg-[rgba(218,175,80,1)] min-h-[51px] gap-2.5 text-base text-black font-semibold text-center leading-loose mt-[50px] px-12 py-[13px] rounded-lg max-md:mt-10 max-md:px-5 w-full hover:bg-[rgba(232,175,82,0.9)] transition-colors"
      >
        Check Out Now
      </button>
    </div>
  );
};

export default OrderSummary;