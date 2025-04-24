import React from "react";
import { newcart } from "@/app/lib/interfaces";
import { delItem, moveToWishlist, Incdeccart } from "@/app/actions";

interface ProductCardprops {
  cartItems: newcart[];
}

export default function ProductCard({ cartItems }: ProductCardprops) {
  return (
    <div className="space-y-4"> {/* Use space-y for consistent spacing */}
      {cartItems.map((item) => (
        <div key={item.id}>
          {/* Main Card Container - Mobile first padding, increase on larger screens */}
          <div className="border border-[color:var(--Button-color,#ffffff)] shadow-[0px_1px_0px_0px_rgba(255,255,255,0.08)_inset] bg-[rgba(255,255,255,0.02)] overflow-hidden w-full p-3 sm:p-4 md:p-6 rounded-lg md:rounded-2xl border-solid font-blauer-nue">
            {/* Main Flex Container - Always row, adjust gap and alignment */}
            <div className="flex flex-row gap-3 sm:gap-4 items-start">

              {/* --- Image Column (Smaller width on mobile) --- */}
              <div className="w-1/4 sm:w-[30%] md:w-[24%] flex-shrink-0 flex flex-col items-center pt-1">
                 <img
                    src={item.imageString}
                    alt={item.name}
                    // Maintain aspect ratio, contain within bounds, slightly smaller rounding on mobile
                    className="aspect-[1.08] object-contain w-full rounded-md md:rounded-lg"
                  />
                 {/* "Few left" Badge - Smaller text/padding */}
                 <div className="bg-red-600 text-white self-center w-auto mt-2 px-1.5 py-0.5 rounded text-[10px] sm:text-xs text-center uppercase">
                 only Few left
                 </div>
               </div>

              {/* --- Details Column (Takes remaining width) --- */}
              {/* Removed specific width percentage, flex-grow will handle it */}
              <div className="flex-grow flex flex-col min-w-0"> {/* Added min-w-0 to prevent overflow */}

                {/* Top Actions (Wishlist/Remove) - Smaller text/gap, ensure wrapping */}
                <div className="flex items-center justify-end flex-wrap gap-x-3 gap-y-1 text-xs sm:text-sm md:text-base text-[rgba(186,186,186,1)] font-normal mb-1 md:mb-2">
                    {/* Wishlist Form - Reduced icon size slightly */}
                    <form action={moveToWishlist}>
                      <input type="hidden" name="productId" value={item.id} />
                      <input type="hidden" name="color" value={item.color} />
                      <input type="hidden" name="quantity" value={item.quantity} />
                      <button type="submit" className="flex items-center gap-1 hover:text-white transition-colors">
                        <img
                          src="https://cdn.builder.io/api/v1/image/assets/9e14ec760a13409cba0be5c570ba1763/ebe2f6019a34d657e3a87a406be12b508939378e?placeholderIfAbsent=true"
                          alt=""
                          className="aspect-square object-contain w-4 shrink-0" // Adjusted size
                        />
                        <span className="hidden sm:inline">Wishlist</span> {/* Hide text on xs */}
                      </button>
                    </form>
                    {/* Remove Form - Reduced icon size slightly */}
                    <form action={delItem}>
                      <input type="hidden" name="productId" value={item.id} />
                      <button type="submit" className="flex items-center gap-1 hover:text-white transition-colors">
                        <img
                          src="https://cdn.builder.io/api/v1/image/assets/9e14ec760a13409cba0be5c570ba1763/4adf7c0fd6291357792bc6739ce5cdc353ace1e5?placeholderIfAbsent=true"
                          alt=""
                          className="aspect-square object-contain w-3.5 shrink-0" // Adjusted size
                        />
                         <span className="hidden sm:inline">Remove</span> {/* Hide text on xs */}
                      </button>
                    </form>
                 </div>

                {/* Product Name - Responsive font size, tighter leading */}
                <div className="text-white text-sm sm:text-base md:text-lg font-semibold leading-tight mt-0 md:mt-1 overflow-hidden text-ellipsis whitespace-nowrap" title={item.name}> {/* Added overflow handling */}
                   {item.name}
                 </div>

                {/* Price - Responsive font size */}
                <div className="flex items-baseline flex-wrap gap-x-2 gap-y-0 text-base sm:text-lg md:text-xl mt-1 md:mt-1.5">
                   <div className="text-white font-semibold leading-none">
                     ₹{item.discountprice}
                   </div>
                   <div className="text-[#778082] text-xs sm:text-sm md:text-base font-light line-through leading-none">
                     ₹{item.originalprice}
                   </div>
                 </div>

                {/* Color Info - Small text */}
                <div className="text-white text-[11px] sm:text-xs font-medium mt-1 md:mt-1.5">
                   Color: {item.color}
                 </div>

                {/* Quantity Controls & Discount - Row layout, responsive */}
                <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 mt-2 md:mt-3">
                   {/* Quantity Control Block */}
                   <div className="flex items-center gap-2 whitespace-nowrap">
                     <div className="text-white text-xs sm:text-sm">Qty:</div>
                     <div className="bg-white flex items-center justify-between text-black text-sm rounded max-w-[80px] sm:max-w-[90px] py-0 px-1">
                       <form action={Incdeccart} className="contents"> {/* Use contents to avoid breaking flex */}
                         <input type="hidden" name="productId" value={item.id} />
                         <input type="hidden" name="color" value={item.color} />
                         <input type="hidden" name="quantity" value={item.quantity} />
                         <input type="hidden" name="number" value={-1} />
                         <button
                           type="submit"
                           disabled={item.quantity <= 1}
                           className="text-gray-700 px-1 text-base leading-none disabled:opacity-40 disabled:cursor-not-allowed"
                           aria-label="Decrease quantity"
                         >
                           -
                         </button>
                       </form>
                       <div className="font-medium px-1 text-xs sm:text-sm">{item.quantity}</div>
                       <form action={Incdeccart} className="contents">
                         <input type="hidden" name="productId" value={item.id} />
                         <input type="hidden" name="color" value={item.color} />
                         <input type="hidden" name="quantity" value={item.quantity} />
                         <input type="hidden" name="number" value={1} />
                         <button
                           type="submit"
                           className="text-gray-700 px-1 text-base leading-none"
                           aria-label="Increase quantity"
                         >
                           +
                         </button>
                       </form>
                     </div>
                   </div>
                   {/* Discount Info - Smaller text */}
                   <div className="text-white text-[11px] sm:text-xs">
                      <span className="font-medium">{item.discountpercent}%</span> Discount
                    </div>
                 </div>

                {/* Delivery Info - Very small text */}
                <div className="text-gray-400 text-[10px] sm:text-xs font-normal tracking-wide mt-2 md:mt-2.5">
                   Deliver by <span className="font-semibold text-gray-300">30 march 2025</span>
                 </div>

                {/* Share Button - Minimal */}
                 <div className="mt-2 md:mt-3 self-start">
                    <button className="flex items-center gap-1 text-xs text-gray-400 hover:text-white transition-colors">
                       <img
                         src="https://cdn.builder.io/api/v1/image/assets/9e14ec760a13409cba0be5c570ba1763/56b5a19af21c56de0731e04b300b35fe5df1ee40?placeholderIfAbsent=true"
                         alt=""
                         className="w-3 h-3 object-contain"
                       />
                       <span className="hidden sm:inline">Share</span>
                     </button>
                 </div>

                {/* Removed the confusing "Add from wishlist" button */}

               </div>
             </div>
          </div>
        </div>
      ))}
    </div>
  );
}