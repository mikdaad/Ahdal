import React, { useState,useEffect } from "react";

interface ShippingAddressProps {
  step: number;
  setstep: (step: number) => void;
}


const ShippingAddress: React.FC<ShippingAddressProps> = ({step,setstep} ) => {
  const [sameAsBilling, setSameAsBilling] = useState(true);
  const [termsAgreed, setTermsAgreed] = useState(false);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
    const [state, setState] = useState("");
    const [street, setStreet] = useState("");
    const [shippingnote, setShippingnote] = useState("");
    const [city, setCity] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [phoneno, setPhoneno] = useState("");
    const [email, setEmail] = useState("");
   

  useEffect(() => {
      async function fetchShippingData() {
        try {
          const res = await fetch("/api/user", { method: "GET" });
          if (!res.ok) throw new Error(`Error ${res.status}: Failed to fetch shipping info`);
  
         
          const data = await res.json();
            setFirstname(data.firstName || "");
            setLastname(data.lastName || "");
            setState(data.state || "");
            setStreet(data.street || "");
            setShippingnote(data.shippingnote || "");
            setCity(data.city || "");
            setPostalCode(data.postalCode || "");
            setPhoneno(data.phoneno || "");
            setEmail(data.email || "");
           
     
  
        
       
        } catch (error) {
          console.error("Error fetching shipping data:", error);
        }
      }
  
      fetchShippingData();
    }, []);

  const handlePayment = () => {
    if (!termsAgreed) {
      alert("Please agree to the Terms & Conditions");
      return;
    }
  
    setstep(step+1); // Proceed to the payment step
  };

  return (
    <div className="justify-center border border-[color:var(--Button-color,#ffffff)] shadow-[0px_1px_0px_0px_rgba(255,255,255,0.08)_inset] bg-[rgba(255,255,255,0.02)] flex w-full flex-col overflow-hidden mx-auto pt-[17px] pb-[47px] px-[25px] rounded-2xl border-solid max-md:max-w-full max-md:mt-[22px] max-md:pl-5 font-blauer-nue">
      <div className="self-stretch max-md:max-w-full">
        <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
          <div className="w-[61%] max-md:w-full max-md:ml-0">
            <div className="flex w-full flex-col text-white mt-2 max-md:mt-10">
              <h3 className="text-xl font-medium leading-none">
                Shipping Address
              </h3>
              <div className="self-stretch flex items-stretch gap-[13px] text-base font-normal leading-[1.6] mt-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={sameAsBilling}
                    onChange={() => setSameAsBilling(!sameAsBilling)}
                    className="hidden"
                  />
                  <div className="w-[18px] h-[18px] border border-[#E8AF52] rounded flex items-center justify-center">
                    {sameAsBilling && (
                      <div className="w-[10px] h-[10px] bg-[#E8AF52] rounded-sm"></div>
                    )}
                  </div>
                  <span>My billing and shipping address are the same</span>
                </label>
              </div>
              <div className="text-sm font-light leading-6 mt-[34px]">
                {firstname} {lastname}
                <br />
                Email: {email}
                <br />
                Address: {state}, {city}
                <br />
                {street} 
                <br />
                Pin: {postalCode} 
                <br />
                Mobile: {phoneno}
              </div>
            </div>
          </div>
          <div className="w-[39%] ml-5 max-md:w-full max-md:ml-0">
            <div className="flex w-full flex-col items-stretch text-base text-white font-normal max-md:mt-10">
              <button className="rounded border border-[color:var(--text-grd,#FFF)] bg-[rgba(255,255,255,0.02)] gap-2.5 px-12 py-4 border-solid max-md:px-5 hover:bg-[rgba(255,255,255,0.05)] transition-colors">
                Edit Address
              </button>
              <button className="self-stretch rounded border border-[color:var(--text-grd,#FFF)] bg-[rgba(255,255,255,0.02)] gap-2.5 mt-4 px-12 py-4 border-solid max-md:px-5 hover:bg-[rgba(255,255,255,0.05)] transition-colors">
                Add New Address
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-stretch gap-[13px] text-base text-white font-normal leading-[1.6] mt-4">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={termsAgreed}
            onChange={() => setTermsAgreed(!termsAgreed)}
            className="hidden"
          />
          <div className="w-[18px] h-[18px] border border-[#E8AF52] rounded flex items-center justify-center">
            {termsAgreed && (
              <div className="w-[10px] h-[10px] bg-[#E8AF52] rounded-sm"></div>
            )}
          </div>
          <span>I agree to the Terms & Conditions.</span>
        </label>
      </div>
      <button
        onClick={handlePayment}
        className={`self-stretch ${
          termsAgreed
            ? "bg-[rgba(218,175,80,1)] hover:bg-[rgba(232,175,82,0.9)]"
            : "bg-[rgba(218,175,80,0.7)] cursor-not-allowed"
        } min-h-[51px] gap-2.5 text-base text-black font-semibold text-center leading-loose mt-6 px-12 py-[13px] rounded-lg max-md:px-5 transition-colors`}
        disabled={!termsAgreed}
      >
        Pay with payment gateway
      </button>
    </div>
  );
};

export default ShippingAddress;