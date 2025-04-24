import db from "../../../lib/db";
import { redirect } from "next/navigation";
import React from "react";
import { Mail } from "lucide-react";

export default async function VerifyRequest() {
  const me = await db.user.current();
  if (me) redirect("/");

  return (
    <div className="min-h-screen font-glancyr flex items-center justify-center bg-gradient-to-br from-black to-grey">
       <div
    className="absolute inset-0 bg-cover bg-center blur-md"
    style={{ backgroundImage: 'url("/bgblur.png")' }}
  ></div>

  {/* Gradient Overlay */}
  <div className="relative z-10 inset-0 bg-gradient-to-b from-black to-[#434343] opacity-60"></div>
  <div className="relative z-10   lg:ml-0 items-center ">

  </div>
      <div className="relative z-20 inset bg-white shadow-3xl rounded-3xl p-8 md:p-12 text-center max-w-md w-[80%]">
        <div className="flex justify-center mb-6">
          <div className="bg-yellow-500 p-4 rounded-full shadow-lg">
            <Mail className="h-10 w-10 text-white" />
          </div>
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Check Your Email</h2>
        <p className="text-gray-600 mt-3 text-md">
          A sign-in link has been sent to your email. Click the link to proceed.
        </p>
        <div className="mt-6">
          <span className="text-xs text-gray-500">Didn’t receive an email? Check your spam folder.</span>
        </div>
      </div>
    </div>
  );
}
