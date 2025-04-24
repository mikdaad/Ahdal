import React, { useState } from "react";
import {addToWishlist} from "../../actions";
import { addItem } from "../../actions";
import { WishlistButton,ShoppingBagButton} from "@/app/components/SubmitButtons";


interface ProductDetailsProps {
  id: string;
  title: string;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  price: string;
  description: string;
  colors?: string[];
  originalPrice: string;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({
  id,
  title,
  rating,
  reviewCount,
  inStock,
  price,
  description,
  colors,
  originalPrice,
}) => {
  const [quantity, setQuantity] = useState(2);
  const [selectedColor, setSelectedColor] = useState("red");

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

    const addProductToShoppingCart = () => addItem(id,quantity, selectedColor);
    const addProductToWishlist = () => addToWishlist(id,quantity, selectedColor);

  return (
    <div className="flex w-full flex-col max-md:mt-10">
      <h1 className="text-white text-2xl font-semibold leading-none tracking-[0.72px]">
        {title}
      </h1>

      <div className="flex items-stretch gap-[30px] mt-4">
        <div className="flex items-stretch gap-1.5 my-auto">
          {[...Array(5)].map((_, i) => (
            <img
              key={i}
              src={
                i < rating
                  ? "https://cdn.builder.io/api/v1/image/assets/9e14ec760a13409cba0be5c570ba1763/8cc46b6e75de887e04cfc200024ec64ed6a85e67?placeholderIfAbsent=true"
                  : "https://cdn.builder.io/api/v1/image/assets/9e14ec760a13409cba0be5c570ba1763/62b038f65347e226cdb6aa9bb784aed7dd361b68?placeholderIfAbsent=true"
              }
              alt={i < rating ? "Filled star" : "Empty star"}
              className="aspect-[0.93] object-contain w-3.5 shrink-0 rounded-[1px]"
            />
          ))}
        </div>
        <div className="flex items-stretch gap-[15px] text-sm font-normal">
          <div className="text-white grow">({reviewCount} Reviews)</div>
          <div className="bg-white border w-px shrink-0 h-4 my-auto border-white border-solid" />
          <div className="text-[#0F6] opacity-60">
            {inStock ? "In Stock" : "Out of Stock"}
          </div>
        </div>
      </div>

      <div className="text-white text-2xl font-normal leading-none tracking-[0.72px] mt-[15px]">
      ₹{price} - ₹{originalPrice}
      </div>

      <p className="text-white text-sm font-light leading-[21px] self-stretch mt-[25px] max-md:mr-[3px]">
        {description}
      </p>

      <div className="flex items-stretch gap-[40px_43px] mt-6">
  <div className="text-white text-xl font-normal leading-none tracking-[0.6px]">
    Colours:
  </div>

  <div className="flex items-stretch gap-[11px]">
    {colors?.map((color: string) => (
      <button
        key={color}
        className={`flex gap-2 transition-all duration-200 ${
          selectedColor === color ? "ring-2 ring-white rounded-full scale-110 shadow-md" : "hover:shadow-md"
        }`}
        onClick={() => setSelectedColor(color)}
        aria-label={`Select ${color} color`}
      >
        <div
          className="w-5 h-5 min-h-5 rounded-full"
          style={{ backgroundColor: color }}
        />
      </button>
    ))}
  </div>
</div>

      <div className="flex items-stretch text-xl text-white font-medium whitespace-nowrap leading-[1.4] mt-6">
        <button
          onClick={decreaseQuantity}
          aria-label="Decrease quantity"
          className="focus:outline-none"
        >
          <img
            src="https://cdn.builder.io/api/v1/image/assets/9e14ec760a13409cba0be5c570ba1763/23fbb5047fe28cbfe3279f0aad10ad1984d8ed2b?placeholderIfAbsent=true"
            alt="Decrease"
            className="aspect-[0.91] object-contain w-10 shrink-0 rounded-[8px_0px_0px_8px]"
          />
        </button>
        <div className="overflow-hidden px-[34px] py-2 border-white border-t border-b max-md:px-5">
          {quantity}
        </div>
        <button
          onClick={increaseQuantity}
          aria-label="Increase quantity"
          className="focus:outline-none"
        >
          <img
            src="https://cdn.builder.io/api/v1/image/assets/9e14ec760a13409cba0be5c570ba1763/3087eef606fee8ca0991ccff41bbdea3a4392b4b?placeholderIfAbsent=true"
            alt="Increase"
            className="aspect-[0.93] object-contain w-[41px] shrink-0 rounded-[0px_8px_8px_0px]"
          />
        </button>
      </div>

      

      <div className="self-stretch flex w-full items-stretch gap-5 text-base justify-between mt-6">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addProductToWishlist();
        }}
      >
        <WishlistButton onAddToWishlist={addProductToWishlist} />
      </form>
                <form onSubmit={(e) => { e.preventDefault(); addProductToShoppingCart(); }}>
                  <ShoppingBagButton   onAddToCart={addProductToShoppingCart}/>
                </form>
      </div>

      <div className="border self-stretch flex w-full flex-col overflow-hidden font-medium mt-[30px] py-6 rounded-lg border-white border-solid max-md:mr-[3px]">
        <div className="flex items-center gap-4 text-white ml-4 max-md:ml-2.5">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/9e14ec760a13409cba0be5c570ba1763/16dee33224c4e7976688853a0c5350e4a74a2696?placeholderIfAbsent=true"
            alt="Free Delivery"
            className="aspect-[1] object-contain w-10 self-stretch shrink-0 my-auto"
          />
          <div className="self-stretch min-w-60 my-auto">
            <div className="text-base">Free Delivery</div>
            <div className="text-xs underline mt-2 cursor-pointer hover:text-gray-300 transition-colors">
              Enter your postal code for Delivery Availability
            </div>
          </div>
        </div>
        <div className="border bg-black self-stretch shrink-0 h-px mt-[15px] border-black border-solid" />
        <div className="flex items-center gap-4 ml-4 mt-4 max-md:ml-2.5">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/9e14ec760a13409cba0be5c570ba1763/21c4073370a9b0dac467395a124d480d3c6e4be0?placeholderIfAbsent=true"
            alt="Return Delivery"
            className="aspect-[1] object-contain w-10 self-stretch shrink-0 my-auto"
          />
          <div className="self-stretch my-auto">
            <div className="text-white text-base">Return Delivery</div>
            <div className="text-white text-xs leading-[18px] mt-2">
              Free 30 Days Delivery Returns.{" "}
              <span className="underline cursor-pointer hover:text-gray-300 transition-colors">
                Details
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;