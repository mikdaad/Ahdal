'use client';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { signOut } from "next-auth/react";

interface iAppProps {
  email: string;
  name: string;
  userImage: string;
}




export function UserDropdown({ email, name, userImage }: iAppProps) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const handleLogout = async () => {
    setLoading(true);
    try {
      await signOut({ callbackUrl: "/" })
  
      
  
      router.push("/"); // Redirect after successful logout
    } catch (error) {
      console.error("Error logging out:", error);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="ghost" className="relative h-8 w-8 rounded-full">
        <Avatar className="h-8 w-8">
          <AvatarImage src={userImage} alt="User Image" />
          <AvatarFallback>{name.slice(0, 3)}</AvatarFallback>
        </Avatar>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent className="w-56 bg-transparent" align="end" forceMount>
      <DropdownMenuLabel className="flex flex-col space-y-1 font-blauer-nue">
        <p className="text-sm font-medium text-green-600 leading-none">{name}</p>
        <p className="text-xs leading-none text-green-800 text-muted-foreground">{email}</p>
      </DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem asChild>
        <Button
          onClick={() => router.push("/settings")}
          className="font-blauer-nue font-thin bg-transparent hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground" // Added hover/focus styles for better UX
        >
         <div className="flex flex-row gap-x-2"> <svg width="19" height="24" viewBox="0 0 19 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M18 23V20.3333C18 18.9188 17.5224 17.5623 16.6722 16.5621C15.8221 15.5619 14.669 15 13.4667 15H5.53333C4.33102 15 3.17795 15.5619 2.32778 16.5621C1.47762 17.5623 1 18.9188 1 20.3333V23" stroke="#FAFAFA" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M10.5 10C12.9853 10 15 7.98528 15 5.5C15 3.01472 12.9853 1 10.5 1C8.01472 1 6 3.01472 6 5.5C6 7.98528 8.01472 10 10.5 10Z" stroke="#FAFAFA" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
Manage My Account </div>
        </Button>
      </DropdownMenuItem>
      <DropdownMenuItem asChild>
        <Button
          onClick={() => router.push("/myorders")}
          className="font-blauer-nue font-thin bg-transparent hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
        >
          <div className="flex flex-row gap-x-2">
          <svg width="20" height="22" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1 5.29999V19.5C1 19.7652 1.10536 20.0196 1.29289 20.2071C1.48043 20.3946 1.73478 20.5 2 20.5H18C18.2652 20.5 18.5196 20.3946 18.7071 20.2071C18.8946 20.0196 19 19.7652 19 19.5V5.29999H1Z" stroke="#FAFAFA" stroke-width="1.5" stroke-linejoin="round"/>
<path d="M19 5.3L16.1665 1.5H3.8335L1 5.3M13.7775 8.6C13.7775 10.699 12.0865 12.4 10 12.4C7.9135 12.4 6.222 10.699 6.222 8.6" stroke="#FAFAFA" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
My Orders
</div>
        </Button>
      </DropdownMenuItem>
      <DropdownMenuItem asChild>
        <Button
          onClick={() => router.push("/cancellations")}
          className="font-blauer-nue font-thin bg-transparent hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
        >
          <div className="flex flex-row gap-x-2">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<g>
  <circle cx="12" cy="12" r="11.25" stroke="white" stroke-width="1.5"/>
  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg" x="7" y="7">
    <path d="M1 9L5 5M9 1L4.99924 5M4.99924 5L1 1M5 5L9 9" stroke="#FAFAFA" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
</g>
</svg>
My Cancellations </div>
        </Button>
      </DropdownMenuItem>
      <DropdownMenuItem asChild>
        <Button
          onClick={() => router.push("/reviews")}
          className="font-blauer-nue font-thin bg-transparent hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
        >
         <div className="flex flex-row gap-x-2">
           <svg width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M17.8284 6.93621C18.4517 6.93621 18.7176 7.72859 18.2205 8.10461L14.8905 10.6234C14.1688 11.1693 13.8661 12.1087 14.1334 12.9732L15.3864 17.0261C15.5735 17.6312 14.8729 18.1193 14.3701 17.7341L11.3075 15.3879C10.536 14.7969 9.46399 14.7969 8.69251 15.3879L5.61357 17.7466C5.11152 18.1312 4.41161 17.645 4.59677 17.0403L5.83243 13.0046C6.09532 12.146 5.79694 11.2145 5.08413 10.6684L1.73432 8.1022C1.24111 7.72436 1.50831 6.93621 2.12961 6.93621H6.12744C7.07024 6.93621 7.90305 6.32198 8.18152 5.42125L9.379 1.5479C9.5678 0.937212 10.4322 0.937216 10.621 1.5479L11.8185 5.42124C12.0969 6.32198 12.9298 6.93621 13.8726 6.93621H17.8284Z" stroke="#FAFAFA" stroke-width="1.5"/>
</svg>
My Reviews </div>
        </Button>
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem asChild>
        <Button
          onClick={handleLogout}
          className="text-yellow-300 font-blauer-nue font-thin bg-transparent hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground" // Removed bg-black
          disabled={loading}
        >
         <div className="flex flex-row gap-x-2"> <svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M2 9H11.5M4 12L1 9L4 6M9 4V3C9 2.46957 9.21071 1.96086 9.58579 1.58579C9.96086 1.21071 10.4696 1 11 1H16C16.5304 1 17.0391 1.21071 17.4142 1.58579C17.7893 1.96086 18 2.46957 18 3V15C18 15.5304 17.7893 16.0391 17.4142 16.4142C17.0391 16.7893 16.5304 17 16 17H11C10.4696 17 9.96086 16.7893 9.58579 16.4142C9.21071 16.0391 9 15.5304 9 15V14" stroke="#FAFAFA" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
Log out </div> 
        </Button>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
  );
}
