import { LoadingProductCard } from "@/app/components/storefront/ProductCard";
import { Skeleton } from "@/components/ui/skeleton";
import { TextShimmerWave } from "@/app/components/storefront/loadingcomp";

export default function LoadingFile() {
  return (
    <div className="text-center   h-full mt-[60%] lg:mt-[20%]">
       
    <TextShimmerWave className='font-glancyr text-2xl' duration={1.5}>
      D&nbsp;E&nbsp;C&nbsp;C&nbsp;A&nbsp;N&nbsp; 
       </TextShimmerWave>
    </div>
  );
}
