import React from "react";

interface OrderConfirmationProps {
  orderId: string;
}

const OrderConfirmation: React.FC<OrderConfirmationProps> = ({ orderId }) => {
  return (
    <section className="flex flex-col items-center">
      <img
        src="https://cdn.builder.io/api/v1/image/assets/9e14ec760a13409cba0be5c570ba1763/b9976cb43ebe20b98037ccc70d0213416ae84e30?placeholderIfAbsent=true"
        alt="Success Icon"
        className="aspect-[1] object-contain w-[150px] max-w-full mt-[119px] max-md:mt-10"
      />
      <h1 className="text-white text-[32px] font-semibold leading-[44px] tracking-[0.96px] text-center uppercase mt-[50px] max-md:max-w-full max-md:mt-10">
        Thank you ! <br />
        your order has been placed successfully
      </h1>
      <p className="text-white text-lg font-light leading-[44px] tracking-[0.54px] text-center uppercase mt-4">
        Order Id-{orderId}
      </p>
    </section>
  );
};

export default OrderConfirmation;