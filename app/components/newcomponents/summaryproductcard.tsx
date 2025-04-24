import React from "react"; // Removed useState import
import { newcart } from "@/app/lib/interfaces";
// Removed unused imports: delItem, moveToWishlist, Incdeccart, set

interface OrderSummaryItemsProps { // Renamed Interface
  cartItems: newcart[];
}

// Renamed Component for clarity
export default function OrderSummaryItems({ cartItems }: OrderSummaryItemsProps) {
  // Removed unused quantity state

  // Calculate total discount price
  const totaldiscountprice = cartItems.reduce(
    (prev, item) => prev + item.discountprice * Number(item.quantity || 1), // Added fallback for quantity
    0
  );

  // Calculate total original price
  const totaloriginalprice = cartItems.reduce(
    (prev, item) => prev + item.originalprice * Number(item.quantity || 1), // Added fallback for quantity
    0
  );

  // Calculate discount details
  const totalDiscountAmount = totaloriginalprice - totaldiscountprice;
  const discountPercentValue =
    totaloriginalprice > 0
      ? Math.round((totalDiscountAmount / totaloriginalprice) * 100)
      : 0;

  return (
    // Use space-y for consistent vertical spacing between items and totals section
    <div className="space-y-4">
      {/* --- Cart Items Loop --- */}
      {cartItems.map((item) => (
        // Item Container: Responsive padding, border, background
        <div
          key={item.id} // Key prop is essential for lists
          className="border border-[color:var(--Button-color,#E8AF52)]/50 bg-white/[.02] w-full p-3 sm:p-4 rounded-lg md:rounded-xl font-blauer-nue"
        >
          {/* Item Inner Layout: stacks on xs, row on sm+ */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            {/* Image Column */}
            <div className="w-full sm:w-1/4 md:w-1/5 flex-shrink-0">
              <img
                src={item.imageString}
                alt={item.name}
                className="w-full aspect-[1.08] object-contain rounded-md bg-white/5" // Added subtle bg to image frame
              />
            </div>
            {/* Details Column */}
            <div className="w-full sm:w-3/4 md:w-4/5 flex flex-col">
              <h3 className="text-white text-sm sm:text-base md:text-lg font-semibold leading-tight">
                {item.name}
              </h3>
              {/* Optional details like color could go here */}
              {/* Display Quantity */}
              <p className="text-xs text-gray-400 mt-1">
                Qty: {item.quantity}
              </p>
              {/* Price Display */}
              <div className="flex items-baseline gap-2 mt-1 sm:mt-2">
                <div className="text-white text-base sm:text-lg font-semibold">
                  ₹{item.discountprice}
                </div>
                <div className="text-gray-400 text-xs sm:text-sm line-through">
                  ₹{item.originalprice}
                </div>
              </div>
              {/* Removed empty delivery date span */}
            </div>
          </div>
        </div>
      ))}
      {/* --- End Cart Items Loop --- */}


      {/* --- Separator --- */}
      <div className="border-t border-dashed border-[color:var(--Button-color,#E8AF52)]/70 my-4 sm:my-6" />


      {/* --- Totals Section --- */}
      {/* Centered block with max-width for readability, padding */}
      <div className="w-full max-w-md mx-auto px-4">
        {/* Inner Layout: space between rows, responsive text */}
        <div className="space-y-2 text-sm sm:text-base">
          {/* Original Price Row */}
          <div className="flex justify-between items-center">
            <span className="text-gray-300">Price ({cartItems.length} items):</span>
            <span className="text-white font-medium">₹{totaloriginalprice.toFixed(2)}</span>
          </div>
          {/* Discount Row */}
          <div className="flex justify-between items-center">
            <span className="text-gray-300">Discount ({discountPercentValue}%):</span>
            <span className="text-white font-medium">
              -₹{totalDiscountAmount.toFixed(2)}
            </span>
          </div>
          {/* Shipping Row (Example) */}
          <div className="flex justify-between items-center">
            <span className="text-gray-300">Delivery Charges:</span>
            <span className="text-green-400 font-medium">FREE</span> {/* Or actual value */}
          </div>
        </div>

        {/* --- Final Separator --- */}
        <div className="border-t border-dashed border-[color:var(--Button-color,#E8AF52)]/70 my-3 sm:my-4" />

        {/* Final Total Row */}
        <div className="flex justify-between items-center mt-2">
          <span className="text-white text-base sm:text-lg font-semibold">
            Total Amount:
          </span>
          <span className="text-white text-base sm:text-lg font-semibold">
            ₹{totaldiscountprice.toFixed(2)} {/* Ensure formatting */}
          </span>
        </div>
      </div>
      {/* --- End Totals Section --- */}

    </div>
  );
}