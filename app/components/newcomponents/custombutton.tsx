import React from "react";

interface CustomButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export const CustomButton: React.FC<CustomButtonProps> = ({
  children,
  onClick,
  className = "",
}) => {
  return (
    <button
      className={`self-stretch rounded-md border border-blue-400 bg-white/5   gap-2.5 px-4 py-2 border-solid text-white hover:bg-[rgba(255,255,255,0.05)] transition-colors ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
