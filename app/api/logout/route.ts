import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { options } from "@/lib/auth"; // Ensure you import your NextAuth config
import { cookies } from "next/headers";

export async function POST() {
  try {
    const session = await getServerSession(options);

    if (!session) {
      return NextResponse.json({ success: false, error: "No active session" }, { status: 401 });
    }

    // Clear the session by removing authentication cookies
    cookies().set("next-auth.session-token", "", { expires: new Date(0) });
    cookies().set("__Secure-next-auth.session-token", "", { expires: new Date(0) });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json({ success: false, error: "Logout failed" }, { status: 500 });
  }
}
