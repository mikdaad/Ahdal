// src/components/StatsCard.tsx (Updated for responsive scaling)
import React from "react";

const Divider: React.FC<{ className?: string }> = ({ className = "" }) => (
  <div
    // Responsive Height: h-[40px] default (mobile), lg:h-[58px] larger
    className={`self-stretch shrink-0 h-[45px] lg:h-[58px] my-auto border-r border-white/50 border-solid ${className}`}
  />
);

type StatItemProps = {
  value: string;
  label: string;
  className?: string;
};

const StatItem: React.FC<StatItemProps> = ({ value, label, className = "" }) => (
  // Kept text-center for alignment, removed width constraints for flexbox
  <div className={`my-auto text-center ${className}`}>
    {/* Responsive font size for the main value */}
    <span className="block text-xl lg:text-2xl font-light"> {/* Example sizes */}
      {value}
    </span>
    {/* Responsive font size for the label */}
    <span className="font-thin text-[0.6rem] lg:text-sm">{label}</span>
  </div>
);

// Define stats data remains the same
const statsData = [
  { value: "100k", label: "Happy customers" },
  { value: "1000+", label: "Products" },
  { value: "99%", label: "Regular customers" },
];

const StatsCard: React.FC = () => {
  return (
    // Responsive Margins: Smaller on mobile, larger on lg+
    // Max-width is still useful for very large screens
    <div className="bg-gradient-to-r from-[#5de9f9] via-blue-500 to-[#0808d7] hover:bg-gradient-to-l inset-3 p-[2px] text-white duration-300 hover:shadow-2xl hover:shadow-purple-600/30 rounded-[24px] m-4 lg:m-10 max-w-[570px] mx-auto">
      <div
        // Inner rounding adjusted
        className="shadow-[0px_1px_0px_0px_rgba(255,255,255,0.08)_inset] inset-1 bg-black max-w-full overflow-hidden pt-[0px] pb-[0px] px-0 rounded-[22px] border-solid"
        aria-label="Price filter card"
      >
        <div
          // Removed explicit font sizes here, let StatItem handle them
          className="max-w-full text-white font-normal text-center leading-tight lg:py-[0px]   py-[10px] rounded-[22px] backdrop-blur-[27px] bg-[linear-gradient(180deg,rgba(255,255,255,0.10)_0.28%,rgba(0,0,0,0.00)_140.18%)]"
        >
          {/* Responsive Padding: Smaller on mobile, larger on lg+ */}
          {/* Responsive Gap: Smaller on mobile, larger on lg+ */}
          {/* Layout is always flex-row */}
          <div className="flex w-full flex-row items-center justify-around gap-3 px-3 py-4 lg:gap-4 lg:px-[37px] lg:py-[46px] rounded-[22px] font-blauer-nue">
            {/* Map over stats data */}
            {statsData.map((stat, index) => (
              <React.Fragment key={stat.label}>
                {/* Render Stat Item (now with responsive text sizes) */}
                <StatItem value={stat.value} label={stat.label} />

                {/* Render vertical divider between items (always shown) */}
                {index < statsData.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsCard;