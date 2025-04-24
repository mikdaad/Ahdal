'use client'
import React, { useState } from "react";

interface ShippingAddressProps {
  onAddressChange?: (action: string) => void;
}

const ShippingAddress: React.FC<ShippingAddressProps> = ({
  onAddressChange,
}) => {
  const [sameAsBilling, setSameAsBilling] = useState(true);
  const [termsAgreed, setTermsAgreed] = useState(false);

  const handleEditAddress = () => {
    onAddressChange?.("edit");
  };

  const handleAddNewAddress = () => {
    onAddressChange?.("add");
  };

  const handlePayment = () => {
    if (!termsAgreed) {
      alert("Please agree to the Terms & Conditions");
      return;
    }
    alert("Proceeding to payment gateway");
  };

  return (
    <div className="justify-center border border-[color:var(--Button-color,#E8AF52)] shadow-[0px_1px_0px_0px_rgba(255,255,255,0.08)_inset] bg-[rgba(255,255,255,0.02)] flex w-full flex-col overflow-hidden mx-auto pt-[17px] pb-[47px] px-[25px] rounded-2xl border-solid max-md:max-w-full max-md:mt-[22px] max-md:pl-5">
      <div className="self-stretch max-md:max-w-full">
        <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
          <div className="w-[61%] max-md:w-full max-md:ml-0">
            <div className="flex w-full flex-col text-white mt-2 max-md:mt-10">
              <h3 className="text-xl font-medium leading-none">
                Shipping Address
              </h3>
              <label className="self-stretch flex items-stretch gap-[13px] text-base font-normal leading-[1.6] mt-4 cursor-pointer">
                <input
                  type="checkbox"
                  checked={sameAsBilling}
                  onChange={() => setSameAsBilling(!sameAsBilling)}
                  className="hidden"
                />
                <div className="flex items-center">
                  <img
                    src="https://placehold.co/18x18?text=✓"
                    alt=""
                    className="aspect-[1] object-contain w-[18px] shrink-0 my-auto"
                  />
                </div>
                <span className="grow shrink w-[345px] basis-auto">
                  My billing and shipping address are the same
                </span>
              </label>
              <div className="text-sm font-light leading-6 mt-[34px]">
                KISHOR CHANDRA BEHERAEmail-kishor.cbehera@gmail.comaddress- Qrs
                No B-188, Sector-2 Rourkela
                <br />
                Odisha,India
                <br />
                Pin-769006Mob-9777773446, 9556885883
              </div>
            </div>
          </div>
          <div className="w-[39%] ml-5 max-md:w-full max-md:ml-0">
            <div className="flex w-full flex-col items-stretch text-base text-white font-normal max-md:mt-10">
              <button
                onClick={handleEditAddress}
                className="rounded border border-[color:var(--text-grd,#FFF)] bg-[rgba(255,255,255,0.02)] gap-2.5 px-12 py-4 border-solid max-md:px-5 hover:bg-[rgba(255,255,255,0.05)] transition-colors"
              >
                Edit Address
              </button>
              <button
                onClick={handleAddNewAddress}
                className="self-stretch rounded border border-[color:var(--text-grd,#FFF)] bg-[rgba(255,255,255,0.02)] gap-2.5 mt-4 px-12 py-4 border-solid max-md:px-5 hover:bg-[rgba(255,255,255,0.05)] transition-colors"
              >
                Add New Address
              </button>
            </div>
          </div>
        </div>
      </div>
      <label className="flex items-stretch gap-[13px] text-base text-white font-normal leading-[1.6] mt-4 cursor-pointer">
        <input
          type="checkbox"
          checked={termsAgreed}
          onChange={() => setTermsAgreed(!termsAgreed)}
          className="hidden"
        />
        <div className="flex items-center">
          <img
            src="https://placehold.co/18x18?text=✓"
            alt=""
            className={`aspect-[1] object-contain w-[18px] shrink-0 my-auto ${
              !termsAgreed ? "opacity-30" : ""
            }`}
          />
        </div>
        <span className="basis-auto grow shrink">
          I agree to the Terms & Conditions.
        </span>
      </label>
      <button
        onClick={handlePayment}
        disabled={!termsAgreed}
        className={`self-stretch ${
          termsAgreed
            ? "bg-[rgba(218,175,80,1)] hover:bg-[rgba(232,175,82,0.9)]"
            : "bg-[rgba(218,175,80,0.6)] cursor-not-allowed"
        } min-h-[51px] gap-2.5 text-base text-black font-semibold text-center leading-loose mt-6 px-12 py-[13px] rounded-lg max-md:px-5 transition-colors`}
      >
        Pay with payment gateway
      </button>
    </div>
  );
};

export default ShippingAddress;