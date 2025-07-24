'use client'
import React, { useState } from "react";
import Link from "next/link";

const Footer: React.FC = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Newsletter subscription:", email);
    setEmail("");
  };

  return (
    <footer className="bg-[rgba(255,255,255,0.02)] flex w-full flex-col items-stretch max-md:max-w-full">
      <div className="w-full px-[74px] py-[71px] border-[rgba(255,255,255,0.1)] border-t max-md:max-w-full max-md:px-5">
        <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
          <div className="w-2/5 max-md:w-full max-md:ml-0">
            <div className="max-md:mt-10">
              <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
                <div className="w-[76%] max-md:w-full max-md:ml-0">
                  <div className="flex grow flex-col text-base text-[rgba(108,115,125,1)] font-light max-md:mt-10">
                    <h6 className="text-[rgba(234,234,236,1)] font-semibold">
                      Contact us
                    </h6>
                    <div className="leading-[26px] mt-3.5">
                      Phone: +91-7259162197
                      <br />
                      
                    </div>
                    <div className="leading-[26px] self-stretch mt-6">
                      Need help or have a question?
                      <br />
                      Contact us at:{" "}
                      <a
                        href="mailhref:ahdalsteeldoorsandwindows@gmail.com"
                        className="hover:text-white transition-colors"
                      >
                        ahdalsteeldoorsandwindows@gmail.com
                      </a>
                    </div>
                    <div className="leading-[26px] mt-[23px]">
                      Farangipete , mangalore <br />
                      karnataka , India, 574143
                    </div>
                  </div>
                </div>
                <div className="w-[24%] ml-5 max-md:w-full max-md:ml-0">
                  <div className="flex flex-col text-base text-[rgba(108,115,125,1)] font-normal max-md:mt-10">
                    <h6 className="text-[rgba(234,234,236,1)] font-semibold">
                      Account
                    </h6>
                    <Link
                      href="/products"
                      className="font-light leading-loose mt-3 hover:text-white transition-colors"
                    >
                      Products
                    </Link>
                    <Link
                      href="/account"
                      className="leading-loose self-stretch hover:text-white transition-colors"
                    >
                      My Account
                    </Link>
                    <Link
                      href="/wishlist"
                      className="leading-loose self-stretch max-md:mr-[3px] hover:text-white transition-colors"
                    >
                      My Wishlist
                    </Link>
                    <Link
                      href="/signin"
                      className="leading-loose mt-[25px] hover:text-white transition-colors"
                    >
                      Sign In
                    </Link>
                    <Link
                      href="/offers"
                      className="leading-loose hover:text-white transition-colors"
                    >
                      Hot Offers
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-3/5 ml-5 max-md:w-full max-md:ml-0">
            <div className="grow max-md:max-w-full max-md:mt-10">
              <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
                <div className="w-[35%] max-md:w-full max-md:ml-0">
                  <div className="flex flex-col text-base text-[rgba(108,115,125,1)] font-normal max-md:mt-10">
                    <h6 className="text-[rgba(234,234,236,1)] font-semibold">
                      Useful Links
                    </h6>
                    <Link
                      href="/new-products"
                      className="leading-loose mt-3.5 hover:text-white transition-colors"
                    >
                      New Products
                    </Link>
                    <Link
                      href="/best-sellers"
                      className="leading-loose hover:text-white transition-colors"
                    >
                      Best Sellers
                    </Link>
                    <Link
                      href="/manufacturers"
                      className="leading-loose hover:text-white transition-colors"
                    >
                      Manufacturers
                    </Link>
                    <Link
                      href="/supplies"
                      className="leading-loose hover:text-white transition-colors"
                    >
                      Supplies
                    </Link>
                    <Link
                      href="/specials"
                      className="leading-loose hover:text-white transition-colors"
                    >
                      Specials
                    </Link>
                    <Link
                      href="/privacy-policy"
                      className="leading-loose hover:text-white transition-colors"
                    >
                      Privacy Policy
                    </Link>
                    <Link
                      href="/terms"
                      className="font-light leading-loose self-stretch hover:text-white transition-colors"
                    >
                      Terms & Conditions
                    </Link>
                  </div>
                </div>
                <div className="w-[65%] ml-5 max-md:w-full max-md:ml-0">
                  <div className="flex grow flex-col items-stretch text-base text-[rgba(108,115,125,1)] font-semibold max-md:mt-10">
                    <h6 className="text-[rgba(234,234,236,1)]">
                      Email Newsletter
                    </h6>
                    <div className="font-light leading-[26px] mt-3.5">
                      Subscribe href our newsletter and get
                      <br />
                      10% off your first purchase
                    </div>
                    <form onSubmit={handleSubmit} className="mt-[25px]">
                      <input
                        type="email"
                        placeholder="Your email *"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="bg-white border w-[285px] max-w-full overflow-hidden font-normal px-4 py-[11px] border-[rgba(224,229,235,1)] border-solid max-md:mr-0.5 max-md:pr-5 text-black"
                      />
                      <button
                        type="submit"
                        className="bg-[#4e9fb8] text-[15px] text-black whitespace-nowrap text-center leading-loose mt-2.5 px-[70px] py-2 max-md:mr-0.5 max-md:px-5 hover:bg-[rgba(218,175,80,0.9)] transition-colors w-[285px]"
                      >
                        Subscribe
                      </button>
                    </form>
                    <img
                      src="https://cdn.builder.io/api/v1/image/assets/9e14ec760a13409cba0be5c570ba1763/d7e5f58e032f53528969c6f944a77ab08c8b5a27?placeholderIfAbsent=true"
                      alt="Payment methods"
                      className="aspect-[10.42] object-contain w-[250px] max-w-full mt-[26px]"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="self-center flex w-full max-w-[1290px] items-stretch gap-5 text-sm text-[#6d747e] font-light text-right leading-none flex-wrap justify-between py-[25px] border-[rgba(255,255,255,0.1)] border-t max-md:max-w-full">
        <img
          src="https://cdn.builder.io/api/v1/image/assets/9e14ec760a13409cba0be5c570ba1763/50cadfd371791d953cf0048b7e874aee81575cd6?placeholderIfAbsent=true"
          alt="Deccan logo"
          className="aspect-[9.01] object-contain w-[135px] shrink-0 max-w-full"
        />
        <div>Copyright © 2025 AHDAL</div>
      </div>
    </footer>
  );
};

export default Footer;