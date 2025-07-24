import React from "react";
import { Button } from "../ui/button"; 
import Link from "next/link";

// Assuming 'Blauer Nue' font is configured as 'font-blauer-nue' in tailwind.config.js
// If not, use font-['Blauer_Nue'] directly in the className.

const HeroContent: React.FC = () => {
  return (
    // Use gap for consistent spacing between elements
    // self-stretch helps if parent is flex align-items-stretch
    // md:mt-0 can counteract parent's mobile margin if needed (adjust based on HeroSection)
    <div className="flex w-full flex-col gap-4 md:gap-5 self-stretch max-md:mt-10 md:mt-0">

      {/* Sub-headline - Adjusted size/leading slightly */}
      <span className="
        text-white   /* Specific color */
        text-sm md:text-base        /* Responsive size */
        font-extrabold
        leading-relaxed             /* Consistent leading */
        uppercase                   /* Often used for tags like this */
        tracking-wider              /* Add letter spacing */
      ">
        SAVE UP TO 70%
      </span>

      {/* Main Headline - Removed inline style, added responsive classes */}
      <h1
        id="hero-heading"
        className="
          text-4xl                    /* Mobile font size (36px) */
          leading-tight               /* Mobile line height */
          md:text-5xl                 /* Medium+ font size (48px) */
          md:leading-none             /* Medium+ line height */
          font-medium
          bg-clip-text text-transparent /* Gradient text effect */
          bg-gradient-to-t from-[#5de9f9] to-white
          font-blauer-nue             /* Custom font */
          w-full                      /* Ensure it takes full width & allows wrapping */
          break-words                 /* Prevent overflow from long words */
        "
        // The conflicting inline style attribute has been REMOVED
      >
        New Arrival Collection
      </h1>

      {/* Paragraph - Added responsive classes */}
      <p className="
        text-[rgba(199,199,199,1)]   /* Specific color */
        text-base                   /* Mobile font size (16px) */
        leading-relaxed             /* Mobile line height */
        md:text-xl                  /* Medium+ font size (20px) */
        md:leading-relaxed          /* Medium+ line height */
        font-extralight self-stretch
        font-blauer-nue             /* Custom font */
        w-full                      /* Ensure it uses available width */
      ">
        Explore the brand new doors in ahdal stores with a click.
      </p>

      {/* Button - Responsive width */}
      <Link href="/shop"> <Button className="
        mt-4 md:mt-5               /* Margin top */
        rounded-[8px]
        w-full                      /* Mobile: Full width */
        md:w-auto md:px-10          /* Medium+: Auto width based on content + padding */
        border border-[#0808d7]
        bg-[rgba(255,255,255,0.02)]
        text-white                  /* Ensure text color */
        hover:bg-[#E8AF52]/20       /* Example hover state */
        font-medium                 /* Match other text weights */
        self-center md:self-start   /* Center button on mobile, align left on medium+ */
      ">
        Explore now
      </Button>
      </Link>

    </div>
  );
};

export default HeroContent;