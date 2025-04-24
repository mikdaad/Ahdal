"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const navbarLinks = [
  {
    id: 0,
    name: "HOME",
    href: "/getstarted",
  },
  {
    id: 1,
    name: "ABOUT US",
    href: "/about",
  },
  {
    id: 2,
    name: "SHOP",
    href: "/",
  },
  {
    id: 3,
    name: "CONTACT",
    href: "/about",
  },
  
];

export function NavbarLinks() {
  const location = usePathname();
  return (
    <div className="hidden md:flex justify-end items-center gap-x-10 mr-8 mt-0">
      <div className="w-64"></div>

      {navbarLinks.map((item) => (
        <Link
          href={item.href}
          key={item.id}
          className={cn(
            "relative group p-2 font-medium rounded-md transition duration-200 text-white text-[0.9rem]",
            location === item.href
              ? "font-semibold border-white"
              : "hover:bg-white hover:bg-opacity-25"
          )}
        >
          {item.name}
          
          {/* Underline for active link */}
          {location === item.href && (
            <div className="absolute bottom-[-6px] left-1/2 transform -translate-x-1/2 w-[59px] h-[4px] bg-[#EED359] rounded-[40px]"></div>
          )}
        </Link>
      ))}
    </div>
  );
}
