"use client";

 import { useState, useEffect } from "react";
 import { Button } from "@/components/ui/button";
 import { Input } from "@/components/ui/input";
 import { Label } from "@/components/ui/label";
 import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
 import { useForm } from "react-hook-form";
 import { ChevronLeft } from "lucide-react";
 import Link from "next/link";
 import { redirect } from "next/navigation";
 import { Loader2 } from "lucide-react";

 type ShippingFormData = {
  firstName: string;
  lastName: string;
  state: string;
  street: string;
  shippingnote: string;
  city: string;
  postalCode: string;
  phoneno: string;
  
 
 };

 export default function UpdateShippingForm() {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<ShippingFormData>();
  const [shippingData, setShippingData] = useState<ShippingFormData | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchShippingData() {
      try {
        const res = await fetch("/api/user", { method: "GET" });
        if (!res.ok) throw new Error(`Error ${res.status}: Failed to fetch shipping info`);

        if (res.status === 401) {
          return redirect("/auth/signin");
        }

        const data = await res.json();
        setShippingData(data);

        setValue("firstName", data.firstName || "");
        setValue("lastName", data.lastName || "");
        setValue("state", data.state || "");
        setValue("street", data.street || "");
        setValue("shippingnote", data.shippingnote || "");
        setValue("city", data.city || "");
        setValue("postalCode", data.postalCode || "");
    
        setValue("phoneno", data.phoneno || "");
      
     
      } catch (error) {
        console.error("Error fetching shipping data:", error);
      }
    }

    fetchShippingData();
  }, [setValue]);

  const onSubmit = async (formData: ShippingFormData) => {
    setLoading(true);
    const res = await fetch("/api/user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (res.status === 401) {
      return redirect("/auth/signin");
    }

    if (res.ok) {
      setLoading(false);
      alert("Shipping details updated successfully!");
    } else {
      alert("Error updating shipping details!");
    }
  };

  return (
    <div className="justify-center items-stretch border border-[color:var(--Button-color,#000000)] shadow-[0px_1px_0px_0px_rgba(255,255,255,0.08)_inset] bg-[rgba(255,255,255,0.02)] flex w-full flex-col overflow-hidden text-sm text-[rgba(97,97,97,1)] font-light mx-auto px-[26px] py-[25px] rounded-2xl border-solid max-md:max-w-full max-md:mt-[22px] max-md:px-5 font-blauer-nue">
    <div className="flex items-center gap-x-4 mb-4">
      
      <h1 className="text-white text-xl font-medium leading-none tracking-[-0.9px]">
        Update Shipping Address
      </h1>
    </div>
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex items-stretch gap-5 leading-[26px] flex-wrap mt-[19px] max-md:max-w-full">
        <div className="flex flex-col w-full sm:w-[calc(50%-10px)]">
         
          <Input
            type="text"
            id="firstName"
            placeholder="First Name"
            {...register("firstName", { required: "First name is required" })}
            className="bg-[rgba(255,255,255,0.02)] border px-4 py-[7px] rounded-lg border-[rgba(137,137,137,1)] border-solid text-white"
          />
          {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName.message}</p>}
        </div>
        <div className="flex flex-col w-full sm:w-[calc(50%-10px)]">
         
          <Input
            type="text"
            id="lastName"
            placeholder="Last Name"
            {...register("lastName", { required: "Last name is required" })}
            className="bg-[rgba(255,255,255,0.02)] border px-[13px] py-[7px] rounded-lg border-[rgba(137,137,137,1)] border-solid text-white"
          />
          {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName.message}</p>}
        </div>
      </div>
      <div className="flex flex-col mt-3">
        
        <Input
          type="text"
          id="address"
          placeholder="Address and number"
          {...register("state", { required: "Address is required" })}
          className="bg-[rgba(255,255,255,0.02)] border px-[13px] py-[7px] rounded-lg border-[rgba(137,137,137,1)] border-solid text-white"
        />
        {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state.message}</p>}
      </div>
      <div className="flex flex-col mt-3">
       
        <textarea
          id="shippingNote"
          placeholder="Shipping note (optional)"
          {...register("shippingnote")}
          className="bg-[rgba(255,255,255,0.02)] border pt-[7px] pb-[19px] px-3.5 rounded-lg border-[rgba(137,137,137,1)] border-solid text-white"
        />
      </div>
      <div className="flex items-stretch gap-[17px] leading-[26px] flex-wrap mt-3 max-md:max-w-full">
        <div className="flex flex-col w-full sm:w-[calc(50%-8.5px)]">
         
          <Input
            type="text"
            id="city"
            placeholder="City"
            {...register("city", { required: "City is required" })}
            className="bg-[rgba(255,255,255,0.02)] border px-7 py-[7px] rounded-lg border-[rgba(137,137,137,1)] border-solid text-white"
          />
          {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city.message}</p>}
        </div>
        <div className="flex flex-col w-full sm:w-[calc(50%-8.5px)]">
          
          <Input
            type="text"
            id="postalCode"
            placeholder="Postal Code"
            {...register("postalCode", { required: "Postal code is required" })}
            className="bg-[rgba(255,255,255,0.02)] border px-4 py-[7px] rounded-lg border-[rgba(137,137,137,1)] border-solid text-white"
          />
          {errors.postalCode && <p className="text-red-500 text-xs mt-1">{errors.postalCode.message}</p>}
        </div>
      </div>
      <div className="flex flex-col mt-3">
        
      <select
  id="street"
  {...register("street", { required: "Country is required" })}
  className="bg-[rgba(255,255,255,0.02)] border px-[26px] py-3 rounded-lg border-[rgba(137,137,137,1)] border-solid text-white"
>
  <option value="" disabled selected className="text-gray-400">
    Country/Region
  </option>
  <option value="india" className="text-black">
    India
  </option>
  <option value="usa" className="text-black">
    USA
  </option>
  <option value="uk" className="text-black">
    UK
  </option>
  <option value="canada" className="text-black">
    Canada
  </option>
  <option value="australia" className="text-black">
    Australia
  </option>
</select>

        {errors.street && <p className="text-red-500 text-xs mt-1">{errors.street.message}</p>}
      </div>
      <div className="flex items-center gap-1.5 text-white leading-none ml-[18px] mt-3 max-md:ml-2.5">
        <Input
          type="checkbox"
          id="saveInfo"
      
          className="bg-white w-4 shrink-0 h-4 border-white border-solid border-2"
        />
        <Label htmlFor="saveInfo" className="basis-auto grow shrink cursor-pointer">
          Save this information for a future fast checkout
        </Label>
      </div>
      <Button
        type="submit"
        className="rounded border border-[color:var(--text-grd,#FFF)] bg-[rgba(255,255,255,0.02)] gap-2.5 text-base text-white font-normal mt-[25px] px-12 py-4 border-solid max-md:px-5 w-full hover:bg-[rgba(255,255,255,0.05)] transition-colors"
        disabled={loading}
      >
        {loading ? <Loader2 className="animate-spin w-5 h-5" /> : "Save Address"}
      </Button>
    </form>
  </div>
  );
 }