import Image from "next/image";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  image: string;
  title: string;
  description: string;
  currentPrice: string;
  originalPrice: string;
  discount: string;
  rating: number;
  reviews: number;
  className?: string;
}

export function ProductCard({
  image,
  title,
  description,
  currentPrice,
  originalPrice,
  discount,
  rating,
  reviews,
  className,
}: ProductCardProps) {
  return (
    <div className={cn("flex flex-col gap-2 p-4 rounded-lg bg-white", className)}>
      <Image
        src={image}
        alt={title}
        className="w-full h-32 object-cover rounded-lg"
        loading="lazy"
      />
      <h3 className="font-semibold text-lg">{title}</h3>
      <p className="text-sm text-gray-600 line-clamp-2">{description}</p>
      <div className="flex items-center gap-2">
        <span className="text-lg font-bold">{currentPrice}</span>
        <span className="text-sm text-gray-500 line-through">{originalPrice}</span>
        <span className="text-sm text-green-600">{discount}</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="flex">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={cn(
                "w-4 h-4",
                i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
              )}
            />
          ))}
        </div>
        <span className="text-sm text-gray-600">({reviews})</span>
      </div>
    </div>
  );
}
