"use client";

import { useState } from "react";
import Link from "next/link";
// Removed Image import unless you plan to switch later

type Banner = {
  id: string;
  title: string;
  imageString: string;
  link: string; // Store the query string here
  subtext: string;
};

// Assuming 'Blauer Nue' is configured in tailwind.config.js
// fontFamily: { blauer: ['"Blauer Nue"', 'sans-serif'] } -> use font-blauer

export function Banner() {
  const [banners, setBanners] = useState<Banner[]>([
     {
      id: "1",
      title: "Premium Doors",
      imageString: "/banner/b1.jpg",
      link: "?category=Doors&ispremium=true",
      subtext: "50+ Doors available",
    },
    {
      id: "2",
      title: "Premium Windows",
      imageString: "/banner/b2.jpg",
      link: "?category=Windows&ispremium=true",
      subtext: "100+ variety available",
    },
   
  ]);

  return (
    // Responsive Grid & Margin
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 md:ml-[7%] my-5">
      {banners.map((banner) => (
        <Link key={banner.id} href={`/shop${banner.link}`} className="block group"> {/* Added group class */}

          {/* Outer Div: Gradient border is created via its background and padding */}
          {/* Added responsive min-height here */}
          {/* Used p-[1px] for a thin border, adjust if needed */}
          <div className="relative bg-gradient-to-r from-[#5de9f9] via-blue-500 to-[#0808d7] group-hover:bg-gradient-to-l p-[1px] rounded-[24px] duration-300 hover:shadow-2xl hover:shadow-purple-600/30 max-w-[589px] min-h-[202px] md:min-h-[282px]"> {/* Adjusted min-height slightly for padding */}

            {/* Inner Div: Content, BG Image, slightly smaller rounding */}
            {/* Inherits size from parent, reveals border due to parent's padding */}
            <div
              className="relative overflow-hidden rounded-[23px] min-h-[200px] md:min-h-[280px] flex flex-col justify-end bg-cover bg-center text-white" // text-white needed here
              style={{
                backgroundImage: `linear-gradient(270deg, rgba(0, 0, 0, 0) 0%, #000000 99.15%), url('${banner.imageString}')`,
              }}
            >
              {/* Text Block with responsive padding */}
              <div className="relative z-10 p-4 md:p-8"> {/* z-10 ensures text is above bg */}
                <div className="space-y-1 md:space-y-2">
                  <div className="flex flex-row items-center space-x-2">
                    {/* Responsive Title */}
                    <h2 className="text-lg md:text-xl font-blauer font-semibold">{banner.title}</h2>
                    {/* Responsive SVG */}
                    <svg className="w-5 h-5 md:w-6 md:h-6 shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                       <g clipPath="url(#clip0_172_28_final)">
                        <path d="M15 5L13.59 6.41L18.17 11H2V13H18.17L13.58 17.59L15 19L22 12L15 5Z" fill="currentColor" />
                      </g>
                      <defs>
                        <clipPath id="clip0_172_28_final">
                           <rect width="24" height="24" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                  {/* Responsive Subtext */}
                  <p className="text-xs md:text-sm opacity-90 font-thin font-blauer">{banner.subtext}</p>
                </div>
              </div>
            </div> {/* End Inner Content Div */}
          </div> {/* End Outer Gradient Border Div */}
        </Link>
      ))}
    </div> // End Grid Container
  );
}