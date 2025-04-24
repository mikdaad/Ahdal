"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export function AuthButton() {
  const router = useRouter();

  return (
    <Button
      onClick={() => router.push("/auth/signin")}
      className="text-white hover:bg-white bg-transparent hover:bg-opacity-25 hover:text-white text-[1rem] p-2 font-medium rounded-md transition duration-200"
    >
      Sign In
    </Button>
  );
}
