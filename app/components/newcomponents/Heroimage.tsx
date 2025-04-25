import React from "react";

const HeroImage: React.FC = () => {
  return (
    <img
      src="/banner/product.jpg"
      alt="New Arrival Collection"
      className="aspect-[1.16] object-contain w-full shadow-[0px_7px_2px_-20px_rgba(249,191,0,0.3)] grow max-md:max-w-full max-md:mt-10"
    />
  );
};

export default HeroImage;
