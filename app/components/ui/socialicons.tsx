import React from "react";

const SocialIcons: React.FC = () => {
  const socialIcons = [
    {
      src: "https://cdn.builder.io/api/v1/image/assets/9e14ec760a13409cba0be5c570ba1763/16a52d257ed74712f52aaa666f75f01efa77d0993b5f475a3a34ef0d50dd88d5?placeholderIfAbsent=true",
      alt: "Social Media Icon 1",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/9e14ec760a13409cba0be5c570ba1763/06634ec7ddcb23e0dc8a6f1b8e4cc8cfbde6855d6c2860f9e932f1f7a723e067?placeholderIfAbsent=true",
      alt: "Social Media Icon 2",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/9e14ec760a13409cba0be5c570ba1763/a00557a89656bc31b45576f6ba2acd3e5a7525a5edb8ac900f409ebdb1556957?placeholderIfAbsent=true",
      alt: "Social Media Icon 3",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/9e14ec760a13409cba0be5c570ba1763/4c3ee7a4e1377eeb1cfd0deffac7c1a450da63da989aadb03174b3dd5a092c95?placeholderIfAbsent=true",
      alt: "Social Media Icon 4",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/9e14ec760a13409cba0be5c570ba1763/9357915ff10deb66798de221dc94900b660e25c688b4a445d5c689c18885a56a?placeholderIfAbsent=true",
      alt: "Social Media Icon 5",
    },
  ];

  return (
    <div className="flex min-h-[30px] gap-3 flex-1">
      {socialIcons.map((icon, index) => (
        <a
          key={index}
          href="/"
          aria-label={icon.alt}
          className="transition-transform hover:scale-110"
        >
          <img
            src={icon.src}
            alt={icon.alt}
            className="aspect-[1.57] object-contain w-[47px] shadow-[0px_4px_9px_rgba(183,183,183,0.08)] shrink-0 rounded-[5px]"
          />
        </a>
      ))}
    </div>
  );
};

export default SocialIcons;