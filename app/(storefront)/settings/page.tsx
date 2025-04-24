"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { redirect } from "next/navigation";
import { Loader2,ShoppingBag} from "lucide-react";





type UserFormData = {
  firstName: string;
  lastName: string;
  email: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  phoneno: string;
};

export default function UpdateUserForm() {
  const { register, handleSubmit, setValue , formState: { errors } } = useForm<UserFormData>();
  const [userData, setUserData] = useState<UserFormData | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/" }); // Redirect to home or login page after logout
  };

  useEffect(() => {
    async function fetchUserData() {
      try {
        const res = await fetch("/api/user", { method: "GET" });
        if (!res.ok) throw new Error(`Error ${res.status}: Failed to fetch`);

        if (res.status === 401) {
          // If not authenticated, redirect to sign-in page
          return redirect("/auth/signin");
          
        }
  
        const data = await res.json();
        setUserData(data);
  
        setValue("firstName", data.firstName || "");
        setValue("lastName", data.lastName || "");
        setValue("email", data.email || "");
        setValue("street", data.street || "");
        setValue("city", data.city || "");
        setValue("state", data.state || "");
        setValue("postalCode", data.postalCode || "");
        setValue("phoneno", data.phoneno || "");
  
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }
  
    fetchUserData();
  }, [setValue]);
  

  const onSubmit = async (formData: UserFormData) => {
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
      alert("Updated Successfully");
    } else {
      alert("Error updating user!");
    }
  };



  return (
    <div>
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-xl mx-auto font-blauer-nue">
      
   
      <div className="flex items-center gap-x-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/">
            <ChevronLeft className="w-4 h-4" />
          </Link>
        </Button>
        <h1 className="text-xl font-semibold tracking-tight">Update Personal Details</h1>
      </div>

      <Card className="mt-5">
        <CardHeader>
          <CardTitle>your Information</CardTitle>
          <CardDescription>Update your personal details here</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-y-6">
            <div className="flex flex-col gap-3">
              <Label>First Name</Label>
              <Input {...register("firstName")} placeholder="Enter your first name" />
            </div>

            <div className="flex flex-col gap-3">
              <Label>Last Name</Label>
              <Input {...register("lastName")} placeholder="Enter your last name" />
            </div>

            <div className="flex flex-col gap-3">
              <Label>Email</Label>
              <Input {...register("email")} disabled />
            </div>

            <div className="flex flex-col gap-3">
              <Label>Building name , Street</Label>
              <Input {...register("street")} placeholder="Enter your building name , street" />
            </div>

            <div className="flex flex-col gap-3">
              <Label>City</Label>
              <Input {...register("city")} placeholder="Enter your city" />
            </div>

            <div className="flex flex-col gap-3">
              <Label>State</Label>
              <Input {...register("state")} placeholder="Enter your state" />
            </div>

            <div className="flex flex-col gap-3">
              <Label>Postal Code</Label>
              <Input {...register("postalCode")} placeholder="Enter your postal code" />
            </div>

            <div className="flex flex-col gap-3">
              <Label>Mobile Number</Label>
              <Input {...register("phoneno")} placeholder="Mobile Number" />
            </div>

            <Button type="submit" className="w-full"   disabled={loading}>
              {loading ? <Loader2 className="animate-spin w-5 h-5" /> : "Update Details"}

            
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>

    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleLogout();
      }}
      className="flex flex-col items-center p-4 bg-black rounded-md"
    >
      <Button type="submit"  className="max-w-xl mx-auto w-full gap-x-4">
     
        Logout
        </Button>
    </form>
    </div>
  );
}
