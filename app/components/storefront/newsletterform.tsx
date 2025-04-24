import { useState } from "react";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function NewsletterButton() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubscribe = async () => {
    if (!email.trim()) {
      toast.error("Please enter a valid email address.");
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Show success message
      toast.success("Successfully subscribed to the newsletter!");
      
      // Clear input field
      setEmail("");
    } catch (error) {
      toast.error("Failed to subscribe. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative"><Input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="       Enter your email address"
        className=" border px-4 py-3 rounded-[62px] w-[290px] lg:w-[349px] text-black"
      />
        <svg  className="absolute top-2 left-2 " width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M21 4.125H3C2.70163 4.125 2.41548 4.24353 2.2045 4.4545C1.99353 4.66548 1.875 4.95163 1.875 5.25V18C1.875 18.4973 2.07254 18.9742 2.42417 19.3258C2.77581 19.6775 3.25272 19.875 3.75 19.875H20.25C20.7473 19.875 21.2242 19.6775 21.5758 19.3258C21.9275 18.9742 22.125 18.4973 22.125 18V5.25C22.125 4.95163 22.0065 4.66548 21.7955 4.4545C21.5845 4.24353 21.2984 4.125 21 4.125ZM12 11.9738L5.89219 6.375H18.1078L12 11.9738ZM8.69906 12L4.125 16.1925V7.8075L8.69906 12ZM10.3641 13.5262L11.2397 14.3297C11.4472 14.52 11.7185 14.6255 12 14.6255C12.2815 14.6255 12.5528 14.52 12.7603 14.3297L13.6359 13.5262L18.1078 17.625H5.89219L10.3641 13.5262ZM15.3009 12L19.875 7.8075V16.1925L15.3009 12Z" fill="black" fill-opacity="0.4"/>
</svg>
</div>

      <Button
        onClick={handleSubscribe}
        disabled={isSubmitting}
        className="bg-white text-black font-normal px-6 py-3 rounded-[62px] hover:bg-gray-100 w-[290px] lg:w-[349px]"
      >
        {isSubmitting ? "Subscribing..." : "Subscribe to Newsletter"}
      </Button>
    </div>
  );
}
