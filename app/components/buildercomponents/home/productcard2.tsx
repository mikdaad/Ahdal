import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { CldImage } from "next-cloudinary";
import { Heart } from "lucide-react";
import { addItem, addToWishlist } from "../../../actions";
import PriceDisplay2 from "../../storefront/pricedisplay2";
import { Addtocartbtn,Addtowishlistbtn } from "../../SubmitButtons";


interface ProductCardProps {
  item: {
    id: string;
    name: string;
    description: string;
    originalprice: number;
    discountprice: number;
    images: string[];
    stars: number;
  
  };
  className?: string;
}

 

export function ProductCard({ item, className }: ProductCardProps) {
  const addProductToShoppingCart = () => addItem(item.id, 1, "");
  const addProductToWishlist = () => addToWishlist(item.id, 1, "");
  const discount = ((item.originalprice - item.discountprice) / item.originalprice) * 100;
  
  return (
    
       
<article className="max-w-[140px] lg:max-w-[324px] rounded-[2px_2px_2px_2px] m-1 mb-2">
<div className="shadow-[0px_0px_20px_4px_rgba(255,255,255,0.2)] lg:shadow-[0px_0px_20px_4px_rgba(255,255,255,0.3)] bg-white w-full rounded-xl relative">

<Link href={`/product/${item.id}`}>

<Carousel  className="aspect-[1.04] object-contain w-full rounded-[12px_12px_0px_0px]">
    <CarouselContent>
      {item.images.map((image, index) => (
        
        <CarouselItem key={index}>
          
          <div className="relative focus:ring-blue-400 ">
            <div className="  aspect-square">
            <CldImage
                    src={image}
                    alt={item.name}
                    width={250}
                    height={250}
                    crop="fill"
                    sizes="(max-width: 768px) 200px, (max-width: 1024px) 400px, 400px"
                    className="rounded-lg"
                    loading="lazy"
                  />
            </div>
              
          </div>
          
        </CarouselItem>
      ))}
    </CarouselContent>
  </Carousel>
  </Link>
  

  
  
  <div className="relative flex w-full flex-col items-stretch mt-1.5 pl-[15px]">
  <div className="flex">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={cn(
            "w-3 h-3",
            i < item.stars ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
          )}
        />
      ))}
    </div>
    <div className="flex">
    <h3 className="text-black text-md mt-2 font-medium leading-none">
      {item.name}
    </h3>
    {/*<Addtowishlistbtn onAddToWishlist={addProductToWishlist}/>*/}
    </div>

   
   
    <div className="flex w-full lg:gap-5  justify-between mt-2.5">
      <PriceDisplay2
        originalPrice={item.originalprice}
        discountedPrice={item.discountprice}
      />
     {/* <Addtocartbtn  onAddToCart={addProductToShoppingCart} /> */}
    </div>
  </div>
</div>
</article>


  );
}



