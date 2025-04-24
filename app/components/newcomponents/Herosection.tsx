import React from "react";
import HeroImage from "./Heroimage";
import HeroContent from "./herocontent";

const HeroSection: React.FC = () => {
  return (
    <section
      className="w-[90%] lg:w-full max-w-[1287px] mx-auto my-5 px-4 py-5 md:px-6 lg:px-10 rounded-2xl border border-[color:var(--Button-color,#0808d7)] bg-[rgba(255,255,255,0.02)] shadow-[0px_1px_0px_0px_rgba(255,255,255,0.08)_inset]"
      aria-labelledby="hero-heading"
    >
      <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center md:items-start">
        {/* Image Block */}
        <div className="w-full md:w-[40%] lg:w-[30%] md:ml-4">
          <HeroImage />
        </div>

        {/* Content Block */}
        <div className="w-full md:w-[60%] lg:w-[55%] md:ml-4">
          <HeroContent />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
