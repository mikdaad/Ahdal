"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";
import Link from "next/link";
import OrderConfirmation from "@/app/components/newcomponents/thankyou";

export default function SuccessRoute() {
  const [orderId, setOrderId] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const txnId = params.get("txnid") || "";
    setOrderId(txnId);
  }, []);

  return (
    <div>
      <OrderConfirmation orderId={orderId} />

      <Button asChild className="w-full mt-5 sm:mt-6">
        <Link href="/">Back to Homepage</Link>
      </Button>
    </div>
  );
}
