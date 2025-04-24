import React from "react";
import { SocialIcon } from "./socialicon";


export const FooterContactInfo: React.FC = () => {
  return (
    <div className="z-10 flex items-stretch gap-[15px] max-md:mr-[-15px] mt-2">
      <div className="mt-[31px]">
      <SocialIcon
          src="https://cdn.builder.io/api/v1/image/assets/9e14ec760a13409cba0be5c570ba1763/496b73f47d4a6c904acf98c51571a854c2dee1bd437c98fca33ccf102d834415?placeholderIfAbsent=true"
          alt="Social Media Icon 1"
        />
        <SocialIcon
          src="https://cdn.builder.io/api/v1/image/assets/9e14ec760a13409cba0be5c570ba1763/ac6540366b0e428d76928c75a861f220a8ca20c879a1ba75341bc438b42754b3?placeholderIfAbsent=true"
          alt="Social Media Icon 2"
          className="mt-[49px] max-md:mt-10"
        />
        
      </div>
      <div className="flex flex-col text-sm text-white font-medium">
        <h3 className="text-base leading-none tracking-[3px] uppercase">
          Contact{" "}
        </h3>
        <div className="leading-6 mt-[13px]">Address:</div>
        <div className="text-[rgba(200,200,200,1)] font-normal leading-[22px] self-stretch mt-1">
          Bangalore <br />
          Karnataka, India, 769006
        </div>
        <div className="leading-6 mt-[21px]">Phone:</div>
        <div className="text-[rgba(200,200,200,1)] font-normal leading-loose mt-[13px]">
          +91-123456789{" "}
        </div>
      </div>
      <div className="leading-6 mt-[21px]">Email-Id:</div>
        <div className="text-[rgba(200,200,200,1)] font-normal leading-loose mt-[13px]">
        terrificmaile@gmail.com{" "}
        </div>
      
    </div>
  );
};
