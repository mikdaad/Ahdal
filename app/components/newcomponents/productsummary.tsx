'use client'

import React from "react";

interface ProductSummaryProps {
  product: {
    name: string;
    image: string;
    deliveryDate: string;
    price: number;
    originalPrice: number;
  };
  summary: {
    subtotal: number;
    discount: number;
    discountPercentage: number;
    total: number;
  };
}

const ProductSummary: React.FC<ProductSummaryProps> = ({
  product,
  summary,
}) => {
  const formatCurrency = (amount: number) => {
    return `₹${amount.toLocaleString("en-IN")}`;
  };

  return (
    <div className="justify-center items-stretch border border-[color:var(--Button-color,#E8AF52)] shadow-[0px_1px_0px_0px_rgba(255,255,255,0.08)_inset] bg-[rgba(255,255,255,0.02)] flex w-full flex-col overflow-hidden mx-auto pt-[17px] pb-[41px] px-px rounded-2xl border-solid max-md:max-w-full max-md:mt-[22px]">
      <div className="w-[436px] max-w-full ml-4">
        <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
          <div className="w-[38%] max-md:w-full max-md:ml-0">
            <div className="flex grow flex-col items-stretch text-lg text-white font-medium underline tracking-[0.54px] leading-none max-md:mt-6">
              <h3>Product details</h3>
              <img
                src={
                  product.image || "https://placehold.co/156x144?text=Product"
                }
                alt={product.name}
                className="aspect-[1.08] object-contain w-[156px] mt-4 rounded-lg"
              />
            </div>
          </div>
          <div className="w-[62%] ml-5 max-md:w-full max-md:ml-0">
            <div className="flex w-full flex-col text-2xl mt-[59px] max-md:mt-10">
              <h2 className="text-white font-semibold leading-none tracking-[0.72px] self-stretch">
                {product.name}
              </h2>
              <div className="text-white text-base font-normal tracking-[0.48px] mt-4">
                <span className="font-light">Deliver by</span>{" "}
                <span className="font-semibold">{product.deliveryDate}</span>
              </div>
              <div className="flex items-stretch gap-2.5 whitespace-nowrap leading-[1.4] mt-2.5">
                <div className="text-white font-semibold grow">
                  {formatCurrency(product.price)}
                </div>
                <div className="text-[#778082] font-light line-through">
                  {formatCurrency(product.originalPrice)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="border shrink-0 h-px mt-[23px] border-[rgba(232,175,82,1)] border-dashed max-md:max-w-full" />
      <div className="self-center w-[460px] max-w-full mt-6">
        <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
          <div className="w-[58%] max-md:w-full max-md:ml-0">
            <div className="flex grow flex-col text-base text-white font-normal tracking-[0.48px] max-md:mt-10">
              <h3 className="text-lg font-medium leading-none tracking-[0.54px] underline">
                Summary
              </h3>
              <div className="mt-4">Sub total</div>
              <div className="self-stretch mt-4">
                Discount ({summary.discountPercentage}%)
              </div>
              <div className="text-2xl font-semibold leading-none tracking-[0.72px] mt-4">
                Sub-total
              </div>
            </div>
          </div>
          <div className="w-[42%] ml-5 max-md:w-full max-md:ml-0">
            <div className="grow text-white whitespace-nowrap text-right mt-10">
              <div className="flex flex-col text-base font-normal tracking-[0.48px] pl-[18px]">
                <div>{formatCurrency(summary.subtotal)}</div>
                <div className="mt-4">-{formatCurrency(summary.discount)}</div>
              </div>
              <div className="text-2xl font-semibold leading-none tracking-[0.72px] mt-4">
                {formatCurrency(summary.total)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductSummary;
