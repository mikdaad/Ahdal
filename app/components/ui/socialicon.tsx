import React from "react";

interface SocialIconProps {
  src: string;
  alt: string;
  className?: string;
}

export const SocialIcon: React.FC<SocialIconProps> = ({
  src,
  alt,
  className = "",
}) => {
  return (
    <img
      src={src}
      alt={alt}
      className={`aspect-[0.98] object-contain w-11 ${className}`}
    />
  );
};
