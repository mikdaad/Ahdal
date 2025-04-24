'use client'
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { Search, Menu, X } from "lucide-react";
import UserCart from "../storefront/usercart";
import { usePathname } from "next/navigation";
import { Input } from "../ui/input";

interface NavigationProps {
  className?: string;
}

const Navigation = ({ className }: NavigationProps) => {
  const pathname = usePathname();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop" },
    { name: "Contact", href: "/contact" },
  ];

  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      console.log("Searching for:", searchQuery);
    }
    if (e.key === "Escape") {
      setSearchOpen(false);
    }
  };

  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    }
  }, [searchOpen]);

  return (
    <nav
      className={cn(
        "w-full flex flex-col lg:flex-row items-start lg:items-center lg:gap-[40px_100px] pt-4 text-white uppercase font-blauer-nue",
        className
      )}
    >
      {/* Top Row */}
      <div className="w-full flex justify-between items-center lg:w-auto lg:ml-[5%]">
        <Link href="/" className="lg:mr-24">
          <img
            src="/logo.png"
            alt="Logo"
            className="w-[200px] lg:w-[310px] object-contain"
          />
        </Link>

        {/* Hamburger Menu for Mobile */}

        <div className="block lg:hidden flex flex-row items-center gap-6">

        <Link href="/bag" className="mt-1">
            <svg width="25" height="25" viewBox="0 0 36 36" fill="none">
              <path d="M13.6362 34C14.4395 34 15.0907 33.3177 15.0907 32.4762C15.0907 31.6346 14.4395 30.9524 13.6362 30.9524C12.8329 30.9524 12.1816 31.6346 12.1816 32.4762C12.1816 33.3177 12.8329 34 13.6362 34Z" stroke="white" strokeWidth="3" />
              <path d="M29.6362 34C30.4395 34 31.0907 33.3177 31.0907 32.4762C31.0907 31.6346 30.4395 30.9524 29.6362 30.9524C28.8329 30.9524 28.1816 31.6346 28.1816 32.4762C28.1816 33.3177 28.8329 34 29.6362 34Z" stroke="white" strokeWidth="3" />
              <path d="M2 2H7.81818L11.7164 22.4038C11.8494 23.1054 12.2137 23.7356 12.7455 24.1841C13.2774 24.6326 13.9428 24.8708 14.6255 24.8571H28.7636C29.4463 24.8708 30.1117 24.6326 30.6436 24.1841C31.1754 23.7356 31.5397 23.1054 31.6727 22.4038L34 9.61905H9.27273" stroke="white" strokeWidth="3" />
            </svg>
          </Link>

          {/* Cart */}
          <UserCart />

      
        <button
          className="lg:hidden"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          {menuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
        </button>
        </div>
      </div>

      {/* Nav Links */}
      <div
  className={cn(
    "flex-col lg:flex lg:flex-row lg:items-center gap-4 lg:gap-8 lg:gap-16 mt-4 lg:ml-4 lg:mt-0 w-full lg:w-auto transition-all duration-300",
    menuOpen ? "flex bg-black p-4 z-50 absolute top-[70px] left-0" : "hidden lg:flex"
  )}
>

        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "rounded-md px-3 py-2 text-sm transition font-blauer-nue ",
              pathname === link.href
                ?"rounded-[7px] border border-[#edf5f7] border-[0.5px] bg-gradient-to-b from-white/10 to-black/0  [background-position:0.28%_140.18%]  backdrop-blur-[27px] text-white shadow-xl"

                : "hover:text-blue-500"
            )}
            onClick={() => setMenuOpen(false)} // close menu on click
          >
            {link.name}
          </Link>
        ))}

        {/* Search */}
        <div className="flex items-center gap-16">
          {/*<button
            onClick={() => setSearchOpen((prev) => !prev)}
            aria-label="Search"
            className="hover:opacity-80"
          >
            <Search className="w-6 h-6" />
          </button>

          {searchOpen && (
            <div className="relative w-full lg:w-[300px] mt-2 lg:mt-0">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
              <Input
                className="pl-10 pr-4 w-full h-10 rounded-lg text-sm border font-thin border-gray-300 focus:ring-2 focus:ring-white transition-all shadow-yellow-300 shadow-sm text-black"
                placeholder="Search any Product..."
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                onKeyDown={handleKeyDown}
              />
            </div>
          )} */}

          {/* Bag Icon */}
          <Link href="/bag" className="mt-1">
            <svg width="30" height="30" viewBox="0 0 36 36" fill="none">
              <path d="M13.6362 34C14.4395 34 15.0907 33.3177 15.0907 32.4762C15.0907 31.6346 14.4395 30.9524 13.6362 30.9524C12.8329 30.9524 12.1816 31.6346 12.1816 32.4762C12.1816 33.3177 12.8329 34 13.6362 34Z" stroke="white" strokeWidth="3" />
              <path d="M29.6362 34C30.4395 34 31.0907 33.3177 31.0907 32.4762C31.0907 31.6346 30.4395 30.9524 29.6362 30.9524C28.8329 30.9524 28.1816 31.6346 28.1816 32.4762C28.1816 33.3177 28.8329 34 29.6362 34Z" stroke="white" strokeWidth="3" />
              <path d="M2 2H7.81818L11.7164 22.4038C11.8494 23.1054 12.2137 23.7356 12.7455 24.1841C13.2774 24.6326 13.9428 24.8708 14.6255 24.8571H28.7636C29.4463 24.8708 30.1117 24.6326 30.6436 24.1841C31.1754 23.7356 31.5397 23.1054 31.6727 22.4038L34 9.61905H9.27273" stroke="white" strokeWidth="3" />
            </svg>
          </Link>

          {/* Cart */}
          <UserCart />
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
