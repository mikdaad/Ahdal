import React, { useState } from "react";

interface ProductGalleryProps {
  mainImage: string;
  thumbnails: string[];
}

const ProductGallery: React.FC<ProductGalleryProps> = ({
  mainImage,
  thumbnails,
}) => {
  const [currentImage, setCurrentImage] = useState(mainImage);
  const [thumbnailList, setThumbnailList] = useState(thumbnails);

  const handleThumbnailClick = (clickedIndex: number) => {
    const newThumbnails = [...thumbnailList];
    const clickedThumbnail = newThumbnails[clickedIndex];

    // Swap the current main image with the clicked thumbnail
    newThumbnails[clickedIndex] = currentImage;
    setCurrentImage(clickedThumbnail);
    setThumbnailList(newThumbnails);
  };

  return (
    <div className="grow max-md:max-w-full max-md:mt-10">
      {/* Large screens layout */}
      <div className="gap-5 hidden md:flex">
        <div className="w-[30%]">
          <div className="flex flex-col">
            {thumbnailList.map((thumbnail, index) => (
              <img
                key={index}
                src={thumbnail}
                alt={`Product thumbnail ${index + 1}`}
                className={`aspect-[1.02] object-contain w-[205px] ${
                  index > 0 ? "mt-3" : ""
                } rounded-lg cursor-pointer hover:opacity-90 transition-opacity`}
                onClick={() => handleThumbnailClick(index)}
              />
            ))}
          </div>
        </div>
        <div className="w-[70%] ml-5">
          <img
            src={currentImage}
            alt="Main product image"
            className="aspect-[0.79] object-contain w-full rounded-lg"
          />
        </div>
      </div>

      {/* Mobile layout */}
      <div className="md:hidden flex flex-col items-center space-y-4">
        <img
          src={currentImage}
          alt="Main product image"
          className="w-full max-w-full rounded-lg"
        />
        <div className="flex space-x-3 overflow-x-auto scrollbar-hide pb-2">
          {thumbnailList.map((thumbnail, index) => (
            <img
              key={index}
              src={thumbnail}
              alt={`Product thumbnail ${index + 1}`}
              className="w-[80px] h-[80px] object-cover rounded-lg flex-shrink-0 cursor-pointer hover:opacity-90 transition-opacity"
              onClick={() => handleThumbnailClick(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductGallery;
