import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { NewsletterButton } from "./newsletterform";


export const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState("");


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    // Here you would typically send the email to your backend
    toast.success("You've been subscribed to our newsletter");

    setEmail("");
  };

  return (
    <section aria-labelledby="newsletter-heading" className="my-12">
    <div className="bg-[rgba(36,36,36,1)] flex items-stretch gap-[40px_100px] overflow-hidden flex-wrap px-16 py-[33px] rounded-[20px] max-md:px-5">
      <h2
        id="newsletter-heading"
        className="text-white text-2xl lg:text-4xl font-bold leading-[45px] max-md:max-w-full"
      >
        STAY UPTO DATE ABOUT OUR LATEST OFFERS
      </h2>
      <div className="text-base">
        <NewsletterButton />
      </div>
    </div>
  </section>
  );
};