"use client";

import { Home, Heart, Search, Settings, ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState ,useEffect} from "react";
import { cn } from "@/lib/utils";



type BottomNavProps = {
  onSearchClick?: () => void;
};


const navItems = [
  { icon: Home, label: "Home", path: "/" },
  { icon: Heart, label: "Wishlist", path: "/wishlist" },
  { icon: Search, label: "Search", action: "search" }, // Keeps search functionality
  { icon: Settings, label: "Settings", path: "/settings" },
];

export function BottomNav({ onSearchClick }: BottomNavProps) {
  const router = useRouter();
  const [active, setActive] = useState("Home");

  
const [user, setUser] = useState<any>(null);
const [cartTotal, setCartTotal] = useState(0);

useEffect(() => {
  const fetchUserAndCart = async () => {
    try {
      // Fetch user details
      const res = await fetch("/api/user");
      const fetchedUser = await res.json();
      const modifiedUser = JSON.stringify(fetchedUser);
      console.log("fetched user : " + modifiedUser);
      const parsedUser = JSON.parse(modifiedUser);
      console.log("ihfseiuhriushir" + parsedUser.userId);



    

      // Fetch cart data from the API route
      const cartRes = await fetch(`/api/cart?userId=${parsedUser.userId}`);
      const cartData = await cartRes.json();
      console.log(  "cart data : " + cartData);

      setCartTotal(cartData.total || 0);
    } catch (error) {
      console.error("Error fetching user and cart:", error);
    }
  };

  fetchUserAndCart();
}, []);


  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black border-t">
      <div className="relative">
      <button 
  className="absolute -top-6 left-1/2 -translate-x-1/2 
             bg-black border border-gray-500 
             text-white p-4 rounded-full 
             transition-all duration-200 ease-in-out 
             hover:shadow-xl hover:bg-gray-900 
             active:shadow-md active:scale-90 
             focus:ring-2 focus:ring-gray-400  shadow-md shadow-white"
  onClick={() => router.push("/bag")}
>
  <ShoppingCart className="h-6 w-6 text-white" />
    {/* Cart Item Count Badge */}
    {cartTotal > 0 && (
          <span className="absolute -top-0 mt-1 mr-2
                            text-yellow-300 text-xs font-weight-300
                           px-1 py-0.5 rounded-full 
                          ">
            {cartTotal}
          </span>
        )}
</button>

</div>

      <div className="grid grid-cols-4 gap-4 p-1 pt-2">
        {navItems.map((item, index) => (
          <button
            key={index}
            className={cn(
              "flex flex-col items-center gap-1 p-2 rounded-md transition",
              active === item.label ? "bg-gray-900" : "hover:bg-gray-700"
            )}
            onClick={() => {
              setActive(item.label);
              if (item.action === "search" && onSearchClick) {
                onSearchClick();
              } else if (item.path) {
                router.push(item.path);
              }
            }}
          >
            <item.icon className="h-5 w-5 text-white" />
            <span className="text-xs text-white">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}