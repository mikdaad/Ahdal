"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ClientRedirect() {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const hasVisited = localStorage.getItem("visited");

      if (!hasVisited) {
        localStorage.setItem("visited", "true");
        router.replace("/getstarted");
      }
    }
  }, []);

  return null; // No UI needed, just logic
}
