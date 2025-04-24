import React from "react";

interface FooterColumnProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export const FooterColumn: React.FC<FooterColumnProps> = ({
  title,
  children,
  className = "",
}) => {
  return (
    <div className={className}>
      <div className="text-white">
        <h3 className="text-base font-medium leading-none tracking-[3px] uppercase">
          {title}
        </h3>
        <div className="text-xs font-thin leading-[19px] mt-[26px]">
          {children}
        </div>
      </div>
    </div>
  );
};