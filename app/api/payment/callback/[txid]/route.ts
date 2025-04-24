import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import crypto from "crypto";
import axios from "axios";

const prisma = new PrismaClient();


const MERCHANT_ID = "SANDBOXTESTMID";
const SALT_KEY = "51778fc0-016b-48fe-b509-108277bfa5e2";
const SALT_INDEX = "1";

export async function GET(req: NextRequest, { params }: { params: { txid: string } }) {
  try {
    const { txid: merchantTransactionId } = params;

    if (!merchantTransactionId) {
      return NextResponse.json({ error: "Invalid transaction ID" }, { status: 400 });
    }

    // ✅ Generate X-VERIFY
    const stringToHash = `/pg/v1/status/${MERCHANT_ID}/${merchantTransactionId}${SALT_KEY}`;
    const sha256Hash = crypto.createHash("sha256").update(stringToHash).digest("hex");
    const xVerifyChecksum = `${sha256Hash}###${SALT_INDEX}`;

    // ✅ API Call to check payment status
    const statusUrl = `https://api-preprod.phonepe.com/apis/hermes/pg/v1/status/${MERCHANT_ID}/${merchantTransactionId}`;

    const response = await axios.get(statusUrl, {
      headers: {
        "Content-Type": "application/json",
        "X-VERIFY": xVerifyChecksum,
        "X-MERCHANT-ID": MERCHANT_ID,
        Accept: "application/json",
      },
    });

    const paymentStatus = response.data?.code;

    if (!paymentStatus) {
      return NextResponse.json({ error: "Invalid response from payment gateway" }, { status: 500 });
    }

    let status = "PENDING";
    if (paymentStatus === "PAYMENT_SUCCESS") {
      status = "SUCCESS";
    } else if (paymentStatus === "PAYMENT_FAILED") {
      status = "FAILED";
    }

    // ✅ Update order status in the database
    await prisma.order.update({
      where: { id: merchantTransactionId },
      data: { status },
    });

    return NextResponse.redirect(new URL(`/payment/success?txnid=${merchantTransactionId}`, req.nextUrl));
  } catch (error) {
    console.error("Error validating payment:", error);
    return NextResponse.redirect(new URL("/payment/cancel", req.nextUrl));
  }
}
