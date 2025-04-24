import { checkOut, delItem } from "@/app/actions";
import { ChceckoutButton, DeleteItem } from "@/app/components/SubmitButtons";
import { Cart,newcart } from "@/app/lib/interfaces";
import { redis } from "@/app/lib/redis";
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { unstable_noStore as noStore } from "next/cache";
import db from "../../../../lib/db";
import Footer from "@/app/components/newcomponents/footer";
import ShippingAddressForm from "@/app/components/newcomponents/shippingadressform";
import OrderSummary from "@/app/components/newcomponents/ordersummary";
import CartProgress from "@/app/components/newcomponents/cartprogress";
import PricingDetails from "@/app/components/newcomponents/pricingdetails";

import { redirect } from "next/navigation";




export default async function BagRoute() {
  noStore();
  const user = await db.user.current(); 

  if (!user) {
    redirect("/auth/signin");
  }

  const cart: Cart | null = await redis.get(`cart-${user.id}`);

  let totalPrice = 0;

cart?.items.forEach((item) => {
  totalPrice += item.discountprice * Number(item.quantity);
});

const cartItems: Array<newcart> = cart?.items?.map((item) => ({
  id: item.id ,
  imageString: item.imageString ,
  name: item.name,
  color: item.color,
  discountprice: item.discountprice,
  quantity: item.quantity,
  originalprice:item.originalprice,
  discountpercent:23,
})) || [];

  return (
    <div>
      <div className="w-[712px] h-[712px] left-[220px] top-[128px] absolute opacity-10 bg-[radial-gradient(ellipse_50%_50%_at_50%_50%,_#F9BF00_0%,_rgba(252,_232,_3,_0)_100%)] blur-3xl z-0"></div>
    <div className="absolute z-10 p-4 h-full font-glancyr">
      <CartProgress currentStep={2} />
    

             <div className="text-white text-2xl font-semibold leading-none tracking-[0.72px] ml-2.5 mt-[50px] max-md:mt-10">
          Shipping Address
        </div>

        {/* Main Content - Address Form and Order Summary */}
        
        <div className="mt-[23px] max-md:max-w-full">
          <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
            {/* Left Column - Shipping Address Form */}
            <div className="w-[59%] max-md:w-full max-md:ml-0">
          
              <div className="z-10"><ShippingAddressForm /></div>
            </div>

            {/* Right Column - Order Summary 
            <div className="w-[41%] ml-5 max-md:w-full max-md:ml-0">
              <PricingDetails totalPrice={7899} originalprice={12900} />
            </div>
            */}
          </div>
        </div>

             <Footer/>

            </div>

</div>
          
  );
}
