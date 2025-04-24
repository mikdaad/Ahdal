"use client";

import { Button } from "@/components/ui/button";
import { Loader2, ShoppingBag,Heart } from "lucide-react";
import { useFormStatus } from "react-dom";
import { useState } from "react";
//import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify"; // Assuming these are from a UI library like Lucide React
import toast, { Toaster } from 'react-hot-toast';


interface buttonProps {
  text: string;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | null
    | undefined;
}

export function SubmitButton({ text, variant }: buttonProps) {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <Button disabled variant={variant}>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Please Wait
        </Button>
      ) : (
        <Button variant={variant} type="submit">
          {text}
        </Button>
      )}
    </>
  );
}

export function Addtocartbtn({ onAddToCart }: { onAddToCart: () => Promise<{ error?: string; success?: boolean; message?: string } | undefined> }) {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    try {
      const response = await onAddToCart();

      if (!response) {
        toast.success("Added to Cart!", { duration: 2200 });
      } else if (response.error) {
        toast.error(response.error, { duration: 2200 });
      } else if (response.success) {
        toast.success(response.message || "Added to Cart!", { duration: 2200 });
      }
    } catch (error) {
      toast.error("Something went wrong!", { duration: 2200 });
    }
    setLoading(false);
  };

  return (
    <div>
      <button onClick={handleClick} disabled={loading} type="button">
        {loading ? (
          <>
            <Loader2 className="mr-4 h-7 w-7 animate-spin text-white " />
          </>
        ) : (
          <>
            <button
              className="bg-white text-black font-bold font-glancyr mt-[15px] px-[4px] lg:px-[20px] py-2.5 text-[0.70rem] lg:text-xs rounded-[30px_0px_12px_0px] hover:bg-gray-100 transition-colors"
              aria-label="Add to cart"
            >
              Add To Cart
            </button>
          </>
        )}
      </button>

      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
}


export function Newaddtocartbtn({
  onAddToCart,
}: {
  onAddToCart: () => Promise<{ error?: string; success?: boolean; message?: string } | undefined>;
}) {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleClick = async () => {
    setLoading(true);
    setErrorMessage(null); // Reset error

    try {
      const response = await onAddToCart();

      if (!response) {
        toast.success("Added to Cart!");
      } else if (response.error) {
        setErrorMessage(response.error);
        toast.error(response.error);
      } else if (response.success) {
        toast.success(response.message || "Added to Cart!");
      }
    } catch (error) {
      setErrorMessage("Something went wrong!");
      toast.error("Something went wrong!");
    }

    setLoading(false);
  };

  return (
    <div>
      <button
        onClick={handleClick}
        disabled={loading}
        type="button"
        className="block lg:hidden w-full flex items-center justify-center border border-white mt-2 rounded-lg hover:bg-[#e8af52]/10 transition p-2 ml-[20%] px-2"
      >
        {loading ? (
          <Loader2 className="h-6 w-6 animate-spin text-white" />
        ) : (
          <span className="text-white text-xs font-medium font-['Blauer_Nue']">
            Add to Cart
          </span>
        )}
      </button>

      {/* Toast Notifications */}
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
}


export function Largeaddtocartbtn({
  onAddToCart,
}: {
  onAddToCart: () => Promise<{ error?: string; success?: boolean; message?: string } | undefined>;
}) {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleClick = async () => {
    setLoading(true);
    setErrorMessage(null); // Reset error

    try {
      const response = await onAddToCart();

      if (!response) {
        toast.success("Added to Cart!");
      } else if (response.error) {
        setErrorMessage(response.error);
        toast.error(response.error);
      } else if (response.success) {
        toast.success(response.message || "Added to Cart!");
      }
    } catch (error) {
      setErrorMessage("Something went wrong!");
      toast.error("Something went wrong!");
    }

    setLoading(false);
  };

  return (
    <div>

<button
        onClick={handleClick}
        className="hidden lg:block w-fit flex items-center justify-center border border-yellow-300 rounded-lg hover:bg-[#e8af52]/10 transition p-2"
      >
        {loading ? (
          <Loader2 className="h-6 w-6 animate-spin text-white" />
        ) : (
          

        <span className="text-white text-sm font-medium font-['Blauer_Nue']">
          Add to Cart
        </span>
        )}
      </button>


      {/* Toast Notifications */}
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
}

export function Addtowishlistbtn({ onAddToWishlist }: { onAddToWishlist: () => Promise<{ error?: string; success?: boolean; message?: string }> }) {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleClick = async () => {
    setLoading(true);
    setErrorMessage(null); // Reset error state

    try {
      const response = await onAddToWishlist(); // Call the function

      if (response.error) {
        setErrorMessage(response.error);
        toast.error(response.error); // Show error toast
      } else if (response.success) {
        toast.success(response.message || "Added to Wishlist!"); // Show success toast
      }
    } catch (error) {
      setErrorMessage("Something went wrong!");
      toast.error("Something went wrong!");
    }

    setLoading(false);
  };

  return (
    <div>
      <button
        onClick={handleClick}
        disabled={loading}
        type="button" // Prevents form submission
      > 
        {loading ? (
          <>
            <Loader2 className=" p-2   h-12 w-12 text-red-600 animate-spin" />
          </>
        ) : (
          <>

    <Heart
      size={40}
      //className={`${isInWishlist ? 'fill-red-500 text-red-500' : 'text-gray-700'}`}
      className="   p-2 rounded-full transition-colors top-1 text-yellow-500"
    />
          </>
        )}
      </button>

      {/* Toaster component to render notifications */}
      <Toaster position="top-right" reverseOrder={false}  />
    </div>
  );
}


export function ShoppingBagButton({ onAddToCart }: { onAddToCart: () => Promise<{ error?: string; success?: boolean; message?: string } | undefined> }) {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    try {
      const response = await onAddToCart();

      if (!response) {
        toast.success("Added to Cart!", { duration: 2200 });
      } else if (response.error) {
        toast.error(response.error, { duration: 2200 });
      } else if (response.success) {
        toast.success(response.message || "Added to Cart!", { duration: 2200 });
      }
    } catch (error) {
      toast.error("Something went wrong!", { duration: 2200 });
    }
    setLoading(false);
  };

  return (
    <div>
      <Button
        className="self-stretch bg-[rgba(218,175,80,1)] min-h-[51px] gap-2.5 text-black font-semibold text-center leading-loose px-12 py-[13px] rounded-lg max-md:px-5 hover:bg-[rgba(218,175,80,0.9)] transition-colors"
        onClick={handleClick}
        disabled={loading}
        type="button"
      >
        {loading ? (
          <>
            Please Wait
          </>
        ) : (
          <>
            Add to Cart
          </>
        )}
      </Button>

      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
}



export function WishlistButton({ onAddToWishlist }: { onAddToWishlist: () => Promise<{ error?: string; success?: boolean; message?: string }> }) {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleClick = async () => {
    setLoading(true);
    setErrorMessage(null); // Reset error state

    try {
      const response = await onAddToWishlist(); // Call the function

      if (response.error) {
        setErrorMessage(response.error);
        toast.error(response.error, { duration: 2200 }); // Show error toast
      } else if (response.success) {
        toast.success(response.message || "Added to Wishlist!", { duration: 2200 }); // Show success toast
      }
    } catch (error) {
      setErrorMessage("Something went wrong!");
      toast.error("Something went wrong!", { duration: 2200 });
    }

    setLoading(false);
  };

  return (
    <div>
      <Button
        onClick={handleClick}
        className="self-stretch rounded border border-[color:var(--text-grd,#FFF)] bg-[rgba(255,255,255,0.02)] gap-2.5 text-white font-normal px-12 py-4 border-solid max-md:px-5 hover:bg-[rgba(255,255,255,0.05)] transition-colors"
        disabled={loading}
        type="button" // Prevents form submission
      >
        {loading ? (
          <>
            Please Wait
          </>
        ) : (
          <>
            Add to Wishlist
          </>
        )}
      </Button>

      {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}

      {/* Toaster component to display notifications */}
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
}


export function DeleteItem() {
  const { pending } = useFormStatus();

  return (
    <>
      {pending ? (
        <button disabled className="font-medium text-primary text-end">
          Removing...
        </button>
      ) : (
        <button type="submit" className="font-medium text-primary text-end">
          Delete
        </button>
      )}
    </>
  );
}



export function MovetoCart() {
  const { pending } = useFormStatus();

  return (
    <>
      {pending ? (
        <button disabled className="font-medium text-primary text-end">
          moving...
        </button>
      ) : (
        <button type="submit" className="font-medium text-primary text-end ">
          Move to Cart
        </button>
      )}
    </>
  );
}


export function ChceckoutButton() {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <Button disabled size="lg" className="w-full mt-5">
          <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Please Wait
        </Button>
      ) : (
        <Button type="submit" size="lg" className="w-full mt-5">
          Checkout
        </Button>
      )}
    </>
  );
}



