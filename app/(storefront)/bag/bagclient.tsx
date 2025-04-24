// app/(routes)/bag/BagClient.tsx
"use client";

import { useState ,useEffect} from "react";
import PaymentPage from "../../components/paymentpage";
import Footer from "@/app/components/newcomponents/footer";
import CartProgress from "@/app/components/newcomponents/cartprogress";
import ShippingAddressForm from "@/app/components/newcomponents/shippingadressform";
import PricingDetails from "@/app/components/newcomponents/pricingdetails";
import { Cart, newcart } from "@/app/lib/interfaces";
import ShippingAddress from "@/app/components/newcomponents/finalshippingaddress";
import ProductCard from "@/app/components/newcomponents/summaryproductcard";
import PaymentOptions from "@/app/components/newcomponents/paymentoptions";
import OrderConfirmation from "@/app/components/newcomponents/thankyou";
import Navigation from "@/app/components/newcomponents/navigation";

interface Props {
  data: {
    user: any;
    cart: Cart | null;
    totalPrice: number;
    originalprice: number;
    cartItems: newcart[];
  };
}

export default function BagClient({ data }: Props) {
  const [step, setStep] = useState(1);
  const [txnid, setTxnid] = useState("");

    useEffect(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);
    

  return (
    <div className="p-4 h-full font-glancyr">
      <div className="lg:pl-44"> <Navigation/> </div>

     {step===1 && <PaymentPage
        originalprice={data.originalprice}
        totalPrice={data.totalPrice}
        cartItems={data.cartItems}
        setstep={setStep}
        step={step}
      />
     }

{step===2 &&
      <div>
        {/*<div className="w-[712px] h-[712px] left-[220px] top-[128px] absolute opacity-10 bg-[radial-gradient(ellipse_50%_50%_at_50%_50%,_#45BADA_0%,_rgba(69,186,218,_0)_100%)] blur-3xl z-0"></div> */}

        <div className=" z-10 p-4 h-full font-blauer-nue">
          <CartProgress currentStep={2} />

          <div className="text-white text-2xl font-semibold leading-none tracking-[0.72px] ml-2.5 mt-[50px] max-md:mt-10">
            Shipping Address
          </div>

          <div className="mt-[23px] max-md:max-w-full">
            <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
              <div className="w-[59%] max-md:w-full max-md:ml-0">
                <div className="z-10">
                  <ShippingAddressForm />
                </div>
              </div>

              <div className="w-[41%] ml-5 max-md:w-full max-md:ml-0">
                <PricingDetails
                  totalPrice={data.totalPrice}
                  originalprice={data.originalprice}
                  setstep={setStep}
                  step={step}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      }

{step===3 &&
<div className="flex flex-col">

<CartProgress currentStep={3} />
<div className="flex flex-col lg:flex-row  gap-x-10">

      <ShippingAddress  setstep={setStep} step={step}/>
      <ProductCard cartItems={data.cartItems}  />
      </div>  </div>
}

{step===4 &&
<div className="flex flex-col lg:flex-row gap-x-10 ">
      <PaymentOptions setstep={setStep} step={step} totalPrice={data.totalPrice} cartItems={data.cartItems} txnid={txnid} setTxnid={setTxnid}/>
      <ProductCard cartItems={data.cartItems}  />
      </div>
}
{step===5 &&
      <OrderConfirmation orderId={txnid} />
}





      <Footer />
    </div>
  );
}
