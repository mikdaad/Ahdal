import { LoadingProductCard } from "@/app/components/storefront/ProductCard";
import { Skeleton } from "@/components/ui/skeleton";
import { TextShimmerWave } from "@/app/components/storefront/loadingcomp";

export default function LoadingFile() {
  return (
    <div className="text-center   h-full mt-[60%] lg:mt-[20%]">
       
    <TextShimmerWave className='font-glancyr text-2xl' duration={1.5}>
      A&nbsp;H&nbsp;D&nbsp;A&nbsp;L&nbsp;
       </TextShimmerWave>
    </div>
  );
}
