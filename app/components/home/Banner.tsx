import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Banner() {
  return (
<div
  className="relative bg-primary rounded-lg p-6 text-white bg-cover bg-center"
  style={{
    backgroundImage: "linear-gradient(270deg, rgba(0, 0, 0, 0) 0%, #000000 69.15%), url('/dress.png')",
    backgroundSize: "cover",
    backgroundPosition: "center",
  }}
>
  <div className="space-y-2">
    <h2 className="text-2xl font-bold">50-40% OFF</h2>
    <p className="text-lg">Now in (product)</p>
    <p className="text-sm opacity-90">All colours</p>
    <Button variant="secondary" className="mt-4">
      Shop Now
      <ArrowRight className="ml-2 h-4 w-4" />
    </Button>
  </div>
</div>


  );
}
