import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import Image from "next/image";

interface Banner {
  id: string;
  title: string;
  imageString: string;
  subtext: string;
};

type SingleBannerProps = {
    setSelectedStatus: (status: string) => void; // Prop function
  };


export function SingleBanner({ setSelectedStatus }: SingleBannerProps) {
    const [banner, setBanner] = useState<Banner | null>(null);
  
    useEffect(() => {
      async function fetchBanner() {
        try {
          const response = await fetch("/api/bottombanner", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });
          const data: Banner = await response.json(); // Expecting a single banner object
          console.log(data);
          setBanner(data); // Directly set the object
        } catch (error) {
          console.error("Failed to fetch banner:", error);
        }
      }
  
      fetchBanner();
    }, []);
  
    if (!banner) {
      return <div className="text-center text-gray-500"></div>;
    }
  
    return (
      <section className="p-4">
        <div className="relative rounded-lg overflow-hidden">
          <Image
            src={banner.imageString}
            width={300}
            height={200}
            alt={banner.title}
            className="w-full h-[200px] object-cover"
          />
          <div className="absolute inset-0 bg-black/40 p-6 flex flex-col justify-between">
            <div className="text-white">
              <h2 className="text-2xl font-bold">{banner.title}</h2>
              <p className="text-sm opacity-90">{banner.subtext}</p>
            </div>
            <Button  onClick={() => setSelectedStatus("NewArrival")}  variant="secondary">
              View all
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>
    );
  }
