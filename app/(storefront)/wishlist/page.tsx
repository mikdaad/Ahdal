import { delWishlistItem, moveToCart } from "@/app/actions";
import { DeleteItem,MovetoCart } from "@/app/components/SubmitButtons";
import { Wishlist } from "@/app/lib/interfaces";
import { redis } from "@/app/lib/redis";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { unstable_noStore as noStore } from "next/cache";
import { redirect } from "next/navigation";
import db from "../../../lib/db";

export default async function WishlistRoute() {
  noStore();
    const user = await db.user.current();

  if (!user) {
    redirect("/auth/signin");
  }

  const wishlist: Wishlist | null = await redis.get(`wishlist-${user.id}`);

  return (
    <div className="max-w-2xl p-10 mx-auto mt-8 min-h-[55vh] font-glancyr">
      {!wishlist || !wishlist.items.length ? (
        <div className="flex min-h-[400px] flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center mt-20">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
            <Heart className="w-10 h-10 text-primary" />
          </div>

          <h2 className="mt-6 text-xl font-semibold">
            Your Wishlist is Empty
          </h2>
          <p className="mb-8 mt-2 text-center text-sm leading-6 text-muted-foreground max-w-sm mx-auto">
            You have not added any products to your wishlist. Browse our store to
            add items you love.
          </p>

          <Button asChild>
            <Link href="/">Explore Products</Link>
          </Button>
        </div>
      ) : (
        <div className="flex flex-col gap-y-10">
          {wishlist.items.map((item) => (
            <div key={item.id} className="flex">
              <div className="w-24 h-24 sm:w-32 sm:h-32 relative">
                <Image
                  className="rounded-md object-cover"
                  fill
                  src={item.imageString}
                  alt="Product image"
                />
              </div>
              <div className="ml-5 flex  justify-between w-full font-medium">
                <div className="space-y-3">
                <p>{item.name}</p>
                <p className="font-thin">selected color: {item.color}</p>
                <p className="font-thin">selected quantity: {item.quantity}</p>
                </div>
                <div className="flex flex-col h-full justify-between">
                  <p>₹{item.originalprice}</p>
                  

                  <div className="flex gap-x-6">
                    {/* Move to Cart */}
                    <form action={moveToCart} className="text-end">
  <input type="hidden" name="productId" value={item.id} />
  <MovetoCart/>
</form>

                    {/* Delete from Wishlist */}
                    <form action={delWishlistItem} className="text-end">
  <input type="hidden" name="productId" value={item.id} />
  <DeleteItem />
</form>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
