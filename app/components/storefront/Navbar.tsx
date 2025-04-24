
import Link from "next/link";
import { NavbarLinks } from "./NavbarLinks";
import { UserDropdown } from "./UserDropdown";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import db from "../../../lib/db";
import { AuthButton } from "./authbutton";

export async function Navbar() {
    const user = await db.user.current(); 


  return (
    <nav className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-row items-center justify-between">
  {/* Left Section - Logo */}
  <Link href="/" className="hidden  lg:block  items-center ">
    <Image
      src="/logo.svg"
      alt="Company Logo"
      width={161.23}
      height={72.87}
      className="w-[120px] h-[54px] sm:w-[140px] sm:h-[65px] lg:w-[161px] lg:h-[73px]"
      priority
    />
  </Link>

  {/* Center Section - Navbar Links */}
  <div className="hidden lg:flex items-center">
    <NavbarLinks />
  </div>

  {/* Right Section - User Controls (Bag, Login, Register) 
  <div className="flex items-center space-x-4">
  
    {user ? (
      <div className="hidden lg:flex items-center space-x-4">
      
        <UserDropdown
          email={user.email as string}
          name={user.firstName as string}
          userImage={user.profileImage ?? `https://avatar.vercel.sh/${user.profileImage}`}
        />
      </div>
    ) : (
      <div className="flex items-center space-x-3">
       
        <AuthButton/>
      </div>
    )} 
  </div>
  */}
</nav>

  );
}
