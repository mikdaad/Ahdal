'use client'
import { checkOut, delItem } from "@/app/actions";
import { ChceckoutButton, DeleteItem } from "@/app/components/SubmitButtons";
import { Cart,newcart } from "@/app/lib/interfaces";
import { redis } from "@/app/lib/redis";
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { unstable_noStore as noStore } from "next/cache";
import db from "../../../../../lib/db";
import Footer from "@/app/components/newcomponents/footer";
import CartProgress from "@/app/components/newcomponents/cartprogress";
import ShippingAddress from "@/app/components/newcomponents/shippingaddress";
import ProductSummary from "@/app/components/newcomponents/productsummary";

import { redirect } from "next/navigation";




export default async function BagRoute() {
 

  const product = {
    name: "Aspen Recliner Sofa",
    image: "https://placehold.co/156x144?text=Sofa",
    deliveryDate: "30 march 2025",
    price: 1999,
    originalPrice: 1999,
  };

  // Sample order summary data
  const summary = {
    subtotal: 20000,
    discount: 10000,
    discountPercentage: 30,
    total: 10000,
  };

  const handleAddressChange = (action: string) => {
    console.log(`Address action: ${action}`);
    // In a real app, this would open a modal or navigate to an address form
    alert(
      `${action === "edit" ? "Edit" : "Add new"} address functionality would open here`,
    );
  };

  return (
    <div className="border overflow-hidden pt-[60px] border-[rgba(255,255,255,0.1)] border-solid bg-[#121212]">
      <div className="flex w-full flex-col items-center px-20 max-md:max-w-full max-md:px-5">
      

        <CartProgress currentStep={3} />

        <h1 className="text-white text-2xl font-semibold leading-none tracking-[0.72px] mt-[50px] max-md:mt-10">
          Make Payment
        </h1>

        <div className="w-full max-w-[1250px] mt-[23px] max-md:max-w-full">
          <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
            <div className="w-[59%] max-md:w-full max-md:ml-0">
              <ShippingAddress onAddressChange={handleAddressChange} />
            </div>

            <div className="w-[41%] ml-5 max-md:w-full max-md:ml-0">
              <ProductSummary product={product} summary={summary} />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
