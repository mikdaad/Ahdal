import { NextResponse } from "next/server";
import { redis } from "@/app/lib/redis";
import { Cart } from "@/app/lib/interfaces";
// Ensure correct import

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json({ error: "User ID required" }, { status: 400 });
    }

      const cart: Cart | null = await redis.get(`cart-${userId}`);

  const total = cart?.items.reduce((sum, item) => sum + item.quantity, 0) || 0;

    return NextResponse.json({ total });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch cart" }, { status: 500 });
  }
}
