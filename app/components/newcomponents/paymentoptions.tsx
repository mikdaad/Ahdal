"use client";

import React, { useState } from "react";
import { UPISVG } from "./paymentsvgs"; // Assuming this component exists and accepts className
import { newcart } from "@/app/lib/interfaces";
// Removed unused import: import { set } from "zod";

interface PaymentOptionsProps {
  setstep: (step: number) => void;
  step: number;
  totalPrice: number;
  cartItems: newcart[];
  txnid?: string;
  setTxnid?: (txnid: string) => void;
}

const PaymentOptions: React.FC<PaymentOptionsProps> = ({
  step,
  setstep,
  totalPrice,
  cartItems,
  txnid, // Prop exists but internal generation is used in initiatePayment
  setTxnid,
}) => {
  const [selectedPayment, setSelectedPayment] = useState("cod"); // Default to COD
  const [loading, setLoading] = useState(false);
  // Removed internal transactionId state, using generated ID directly

  const handlePaymentSelect = (method: string) => {
    setSelectedPayment(method);
  };

  const initiatePayment = async () => {
    setLoading(true);
    const generatedTxnId = `TXN-${Date.now()}`; // Generate unique ID for this attempt

    try {
      const response = await fetch("/api/initiatepayment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: totalPrice,
          transactionId: generatedTxnId,
          cartItems: cartItems,
          paymentMethod: selectedPayment,
        }),
      });
      const data = await response.json();
      const txnId = `TXN${Date.now()}`;
      console.log("API Response:", data); // For debugging

      // --- Success Handling ---
      if (data.redirectUrl) {
        if (setTxnid) {
          setTxnid(txnId); // Set the transaction ID in the parent component
        }
        setstep(step+1);
      }
      if (data.success) {
        window.location.href = data.data.instrumentResponse.redirectInfo.url; // Redirect to PhonePe
      } else {
        console.log("Payment initiation failed");
        // Optionally display an error message to the user
      }
    } catch (error) {
      console.error("Error initiating payment:", error);
      // Optionally display an error message to the user
    } finally {
      setLoading(false);
    }
  };


  // --- Reusable Styles ---
  const detailsBaseStyle = "flex flex-col gap-4 flex-grow font-blauer-nue";
  const descriptionBaseStyle = "flex items-start gap-3 sm:gap-4 text-white";
  const textBlockStyle = "flex flex-col";
  const titleStyle = "text-sm sm:text-base font-medium";
  const descriptionStyle = "text-xs sm:text-sm text-gray-300 mt-1";
  const iconStyle = "w-5 h-5 sm:w-6 sm:h-6 object-contain flex-shrink-0 mt-0.5";
   const payButtonStyle = `bg-yellow-500 hover:bg-yellow-600 transition-colors text-black font-semibold text-center rounded-md disabled:opacity-60 disabled:cursor-not-allowed text-sm sm:text-base px-6 py-2 sm:px-8 sm:py-2.5 w-full sm:w-auto self-end mt-auto`; // mt-auto pushes button down

  const renderPaymentDetails = () => {
    switch (selectedPayment) {
      case "cod":
        return (
          <div className={detailsBaseStyle}>
            <div className={descriptionBaseStyle}>
              {/* Placeholder COD Icon */}
              <svg className={iconStyle} viewBox="0 0 24 24" fill="currentColor"><path d="M17.5 10H16V7c0-2.21-1.79-4-4-4S8 4.79 8 7v3H6.5c-.83 0-1.5.67-1.5 1.5v9c0 .83.67 1.5 1.5 1.5h11c.83 0 1.5-.67 1.5-1.5v-9c0-.83-.67-1.5-1.5-1.5zm-8 0V7c0-1.1.9-2 2-2s2 .9 2 2v3H9.5zM12 17c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"></path></svg>
              <div className={textBlockStyle}>
                <div className={titleStyle}>Pay on Delivery</div>
                <div className={descriptionStyle}>
                  Pay using Cash or UPI when your order is delivered.
                </div>
              </div>
            </div>
            <div className="flex-grow"></div> {/* Pushes button down */}
            <button
              className={payButtonStyle}
              onClick={initiatePayment}
              disabled={loading}
            >
              {loading ? "Placing Order..." : "Place Order (COD)"}
            </button>
          </div>
        );
      case "online":
        return (
          <div className={detailsBaseStyle}>
            <div className={descriptionBaseStyle}>
              {/* Placeholder Secure Online Icon */}
               <svg className={iconStyle} viewBox="0 0 24 24" fill="currentColor"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1s3.1 1.39 3.1 3.1v2z"></path></svg>
              <div className={textBlockStyle}>
                <div className={titleStyle}>Pay Online Securely</div>
                <div className={descriptionStyle}>
                  Use UPI, Credit/Debit Card, or Net Banking via our secure partner gateway.
                </div>
              </div>
            </div>
            <div className="flex-grow"></div> {/* Pushes button down */}
            <button
              className={payButtonStyle}
              onClick={initiatePayment}
              disabled={loading}
            >
              {loading ? "Redirecting..." : "Proceed to Pay Online"}
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  // --- Selection State Styles ---
  const activeBg = "bg-white/10";
  const activeBorder = "border-yellow-500";
  const inactiveBorder = "border-transparent md:border-white/10";
  const activeText = "text-yellow-400 font-semibold";
  const inactiveText = "text-white";
  const hoverBg = "hover:bg-white/5";
  const activeIconColor = "#E8AF52"; // Yellow
  const inactiveIconColor = "currentColor"; // White/Gray depending on text color

  return (
    // Main Container: Responsive padding, no fixed height, subtle bg/border
    <div className="border border-[color:var(--Button-color,#E8AF52)]/50 shadow-sm bg-white/[.02] flex flex-col w-full overflow-hidden p-4 sm:p-5 md:p-6 rounded-lg md:rounded-xl">
      {/* Inner Container: Responsive gap, stacks below md */}
      <div className="flex flex-col md:flex-row gap-6 md:gap-6 lg:gap-8">

        {/* Left Column (Selection): Responsive width */}
        <div className="w-full md:w-[40%] lg:w-[35%] flex-shrink-0 flex flex-col">
          <div className="text-base sm:text-lg font-medium mb-4 text-white">
            Choose Payment Method
          </div>
          {/* Options List */}
          <div className="flex flex-col gap-3 sm:gap-4">
            {/* COD Button */}
            <button
              type="button" // Explicit type
              className={`border rounded-md px-3 py-3 sm:px-4 text-left transition-all duration-200 flex items-center gap-3 sm:gap-4 ${
                selectedPayment === "cod"
                  ? `${activeBg} ${activeBorder} ${activeText}`
                  : `${inactiveBorder} ${inactiveText} ${hoverBg}`
              }`}
              onClick={() => handlePaymentSelect("cod")}
            >
              {/* COD Icon */}
              <svg width="20" height="15" viewBox="0 0 20 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.266 2.3002L18.1259 2.27016C18.3468 2.26241 18.5617 2.3427 18.7233 2.49337C18.885 2.64405 18.9802 2.85276 18.988 3.07362L19.2793 11.4021C19.2869 11.623 19.2063 11.8378 19.0555 11.9994C18.9046 12.1609 18.6958 12.2559 18.4749 12.2634L3.30949 12.6156" stroke="white" strokeWidth="0.833333" />
                  <path d="M16.3677 1.23316L1.44986 2.80108C0.992146 2.84918 0.660093 3.25924 0.7082 3.71695L1.57927 12.0046C1.62737 12.4624 2.03743 12.7944 2.49514 12.7463L17.413 11.1784C17.8707 11.1303 18.2027 10.7202 18.1546 10.2625L17.2836 1.97482C17.2355 1.5171 16.8254 1.18505 16.3677 1.23316Z" stroke="white" strokeWidth="0.833333" />
                  <path d="M9.30033 7.90187C9.46357 7.81265 9.60953 7.70263 9.73766 7.57436C9.86653 7.44519 9.97425 7.29812 10.0606 7.13151M9.30033 7.90187L8.65293 8.2766L8.37862 8.03898L8.40074 7.98577C8.51158 7.96101 8.62082 7.92982 8.72791 7.89238C8.87791 7.83994 9.02368 7.77524 9.16371 7.69878L9.16372 7.69879L9.16619 7.69742C9.17162 7.6944 9.17705 7.69136 9.18245 7.6883C9.18275 7.68813 9.18304 7.68796 9.18333 7.6878C9.3223 7.60894 9.45149 7.51415 9.56831 7.40542L9.73761 7.57432L9.56843 7.40531C9.59326 7.38219 9.61753 7.35845 9.64122 7.33409L9.64122 7.33409L9.64263 7.33263C9.73053 7.24137 9.80518 7.14032 9.86474 7.02993C9.86487 7.02969 9.86499 7.02945 9.86512 7.02921C9.90991 6.94608 9.94613 6.85765 9.973 6.76411L10.0323 6.55784L10.0935 6.3446L10.1398 6.33973L10.2005 6.33336L10.2071 6.33266L10.6149 6.2898L10.6408 6.53678L10.2264 6.58033C10.2032 6.78136 10.1479 6.96481 10.0606 7.13151M9.30033 7.90187C9.27729 7.91459 9.25411 7.92691 9.23081 7.93883L9.30033 7.90187ZM10.0606 7.13151L10.0606 7.13151L10.0606 7.13151ZM9.04118 5.48405L9.16856 5.24446L9.41967 5.48265C9.453 5.51426 9.48355 5.54868 9.51098 5.58553L9.51096 5.58554L9.51367 5.5891C9.58779 5.68646 9.6525 5.79063 9.70693 5.9002C9.70901 5.9044 9.71108 5.9086 9.71314 5.91282L9.71313 5.91282L9.71413 5.91484C9.73483 5.95671 9.75234 6.00009 9.7665 6.04459L9.81733 6.20437L9.54556 6.23293L9.52898 6.23467L8.21124 6.37317L8.18529 6.1262L9.06491 6.03375C9.09469 6.07238 9.12019 6.11449 9.14075 6.1594L9.5196 5.98596L9.47605 5.57157L9.21763 5.59873C9.16307 5.55501 9.10401 5.51654 9.04118 5.48405ZM9.04118 5.48405L9.16622 5.24224L8.89217 4.98229M9.04118 5.48405C8.92669 5.42318 8.79571 5.38081 8.64715 5.35453C8.49859 5.32824 8.33398 5.3246 8.1533 5.34359L8.10441 5.34873L8.07174 5.03794L8.12064 5.0328L8.71512 4.97032L8.80432 4.96094M8.89217 4.98229C9.01153 5.01427 9.12626 5.05762 9.23468 5.11503C9.35178 5.17582 9.45941 5.25156 9.55521 5.33976C9.59746 5.37866 9.63741 5.41999 9.67485 5.46352C9.67535 5.4641 9.67585 5.46468 9.67634 5.46525C9.70046 5.49339 9.72354 5.52244 9.74552 5.55236L9.73191 5.42294L9.73173 5.42117L9.70642 5.18035L9.99317 4.87805C10.0606 4.94199 10.1224 5.01156 10.178 5.086C10.1885 5.09975 10.1988 5.11359 10.209 5.12753L10.4896 5.09803L10.4569 4.78725L9.67375 4.86956L8.86314 4.95476M8.89217 4.98229C8.86315 4.97451 8.83386 4.96741 8.80432 4.96094M8.89217 4.98229L8.86314 4.95476M8.86314 4.95476L8.76374 4.86047L9.66286 4.76596L10.446 4.68365L10.4134 4.37286L8.02819 4.62355L8.06085 4.93434L8.10975 4.9292C8.32152 4.90694 8.52597 4.90995 8.71974 4.94423C8.74814 4.94926 8.77634 4.95481 8.80432 4.96094M8.86314 4.95476L8.80432 4.96094M8.67561 7.71277L8.47543 7.77106L8.96404 7.33307C9.08099 7.26819 9.18944 7.18923 9.287 7.09803L9.38762 7.08745L9.38801 7.08741L9.61609 7.06344L9.57254 6.64906L9.17207 6.534C9.155 6.59343 9.12801 6.64826 9.08918 6.69986L8.2548 6.78756L8.22884 6.54058L9.54658 6.40208L9.56316 6.40034L9.83109 6.37218L9.81254 6.5324C9.80537 6.5943 9.79439 6.65293 9.77981 6.70861C9.75813 6.79137 9.72847 6.86761 9.69146 6.93834L9.69145 6.93834L9.69074 6.93971C9.63994 7.03768 9.58018 7.12604 9.51126 7.20611C9.51102 7.2064 9.51077 7.20669 9.51052 7.20698C9.48882 7.23215 9.46621 7.25651 9.44268 7.28009C9.34249 7.38035 9.22852 7.46628 9.1005 7.53625L9.1005 7.53625L9.09899 7.53708C9.09343 7.54015 9.08786 7.54319 9.08229 7.5462C9.0818 7.54646 9.08132 7.54672 9.08083 7.54699C8.95073 7.61711 8.81581 7.67194 8.67561 7.71277ZM10.0876 5.73018C10.0608 5.6751 10.0318 5.62113 10.0008 5.56838L9.77381 5.59223C9.82132 5.6616 9.86308 5.73525 9.89846 5.81252L9.90217 5.82063L9.90263 5.82165L9.97442 5.97845L10.0659 6.17824L10.1437 6.17007L10.1829 6.16594L10.1895 6.16525L10.5973 6.12239L10.5713 5.87542L10.1636 5.91827C10.143 5.85375 10.1177 5.79087 10.0876 5.73018ZM8.13629 7.85916L8.12395 7.8734L8.13629 7.85916Z" fill="black" stroke="white" stroke-width="0.833333"/>
<path d="M3.1074 2.62686C3.04155 3.33177 2.82367 3.91357 2.45284 4.37151C2.08201 4.82944 1.55823 5.16352 0.882414 5.37449M4.15268 12.5721C3.94171 11.8963 3.60763 11.3725 3.1497 11.0017C2.69176 10.6308 2.10996 10.4129 1.40505 10.3471M14.7102 1.40737C14.9211 2.08319 15.2552 2.60697 15.7131 2.9778C16.1711 3.34863 16.7529 3.56651 17.4578 3.63236M15.7554 11.3526C15.8213 10.6477 16.0392 10.0659 16.41 9.60795C16.7808 9.15001 17.3046 8.81593 17.9804 8.60496" stroke="white" stroke-width="0.833333"/>
</svg>
              <span className="text-sm sm:text-base">Cash On Delivery</span>
            </button>
            {/* Online Button */}
            <button
              type="button" // Explicit type
              className={`border rounded-md px-3 py-3 sm:px-4 text-left transition-all duration-200 flex items-center gap-3 sm:gap-4 ${
                selectedPayment === "online"
                  ? `${activeBg} ${activeBorder} ${activeText}`
                  : `${inactiveBorder} ${inactiveText} ${hoverBg}`
              }`}
              onClick={() => handlePaymentSelect("online")}
            >
              {/* Online Icon (UPI SVG) */}
              <UPISVG // Pass color via className or dedicated prop if needed
                
              />
              <span className="text-sm sm:text-base">Online Payment</span>
            </button>
          </div>
        </div>

        {/* Right Column (Details): Responsive width */}
        <div className="w-full md:w-[60%] lg:w-[65%] mt-6 md:mt-0">
          {/* Render selected payment details - Added subtle bg, padding, min-height, flex structure */}
          <div className="bg-white/[.03] border border-white/10 p-4 rounded-md h-full flex flex-col justify-between min-h-[200px] sm:min-h-[220px]">
            {renderPaymentDetails()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentOptions;