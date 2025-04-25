'use client';

import { useState, useEffect } from "react";
import { UserDropdown } from "./UserDropdown"; 
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const UserCart = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/user");
        if (!res.ok) {
          throw new Error("User not found");
        }
 const userData = await res.json();
        setUser(userData);
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);
  if (loading) {
    return (
      <div className="flex justify-center items-center">
         <div className="h-6 w-6 rounded-full bg-gradient-to-br from-yellow-300 to-white animate-ping"> </div>
      
      </div>
    );
  }

  if(user) {
    return (
    <div className="flex flex-col items-center mt-3 space-x-4 mb-4">
      <UserDropdown
        email={user.email as string}
        name={(user.firstName as string) || "anonymous"}
        userImage={user.profileImage ?? `https://avatar.vercel.sh/${user.firstName}`}
      />
    </div>
  );
}

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center mb-5 ">
        <p className="mb-5 text-gray-600"></p>
        <Button
          onClick={() => router.push("/auth/signin")}
          className="hidden  lg:block py-0 bg-gray-100 text-black text-[0.7rem] rounded-md hover:bg-blue-700 transition"
        >
          Sign In
        </Button>

        <button
          onClick={() => router.push("/auth/signin")}
          className="block lg:hidden  px-1 py-2  bg-gray-100 text-blue-600 text-[0.6rem] font-blauer-nue rounded-md hover:bg-blue-700 transition"
        >
          Sign
        </button>
       
       
      </div>
    );
  }
 
};

export default UserCart;
