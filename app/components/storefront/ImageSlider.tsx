"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { CldImage } from 'next-cloudinary';



interface iAppProps {
  images: string[];
}

export function ImageSlider({ images }: iAppProps) {
  const [mainImageIndex, setMainImageIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      handleNextClick();
    }, 3000); // Auto-scroll every 3 seconds
    return () => clearInterval(interval);
  }, [mainImageIndex, handleNextClick]);

  function handlePreviousClick() {
    setMainImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
    scrollToImage(mainImageIndex === 0 ? images.length - 1 : mainImageIndex - 1);
  }

  function handleNextClick() {
    setMainImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
    scrollToImage(mainImageIndex === images.length - 1 ? 0 : mainImageIndex + 1);
  }

  function scrollToImage(index: number) {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.clientWidth * index;
      scrollRef.current.scrollTo({ left: scrollAmount, behavior: "smooth" });
    }
  }

  return (
    <div className="flex flex-col items-center  no-scrollbar">
      {/* Image Container */}
      <div className="relative w-full max-w-2xl overflow-hidden">
        <div
          ref={scrollRef}
          className="flex w-full overflow-x-auto snap-x snap-mandatory gap-4 scroll-smooth no-scrollbar"
        >
          {images.map((image, index) => (
            <div key={index} className="flex-shrink-0 w-full snap-center">
             <CldImage
  width={400}
  height={400}
  src={image} // Ensure this is the public ID of the Cloudinary image
  alt="Product image"
  className="object-cover w-full h-[400px]"
  crop="fill" // Ensures the image fills the given dimensions
  quality="auto" // Automatically adjusts image quality
  format="auto" // Serves the best format (WebP, AVIF, etc.)
/>
            </div>
          ))}
        </div>
        {/* Navigation Buttons   */}
        <div className="absolute inset-0 flex items-center justify-between px-4">
          <Button onClick={handlePreviousClick} variant="ghost" size="icon">
            <ChevronLeft className="w-6 h-6" />
          </Button>
          <Button onClick={handleNextClick} variant="ghost" size="icon">
            <ChevronRight className="w-6 h-6" />
          </Button>
        </div>
      
      </div>
      {/* Navigation Dots */}
      <div className="flex justify-center mt-4 mb-4 space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setMainImageIndex(index);
              scrollToImage(index);
            }}
            className={`h-3 w-3 rounded-full transition-all duration-300 ${
              mainImageIndex === index ? "bg-black" : "bg-gray-400 opacity-50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
