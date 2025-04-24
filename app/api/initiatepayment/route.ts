import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import db from "../../../lib/db";
import { redirect } from "next/navigation";
import { newcart } from "@/app/lib/interfaces";


const MERCHANT_ID = "SANDBOXTESTMID"; // Replace with actual MID
const SALT_KEY = "51778fc0-016b-48fe-b509-108277bfa5e2";
const SALT_INDEX = "1";
const API_ENDPOINT = "https://api-preprod.phonepe.com/apis/hermes/pg/v1/pay";
const STATUS_ENDPOINT = "https://api-preprod.phonepe.com/apis/hermes/pg/v1/status";

export async function POST(req: NextRequest) {

  let userId;
  let mobileNumber;

   const user = await db.user.current();
  
    if (!user) {
      return redirect("/");
    }
    userId=user.id;
    mobileNumber=user.phoneno;

  try {
    const { amount, transactionId ,cartItems,paymentMethod } = await req.json();

    if(paymentMethod==="cod"){
      await db.$transaction(
        cartItems.map((item: newcart) =>
          db.order.create({
            data: {
              userId,
              transactionId,
              amount,
              status: "SUCCESS",
              itemid: item.id,
              itemimage: item.imageString,
              itemname: item.name,
              itemquantity: item.quantity,
              itemcolor: item.color,
              paymentmode:paymentMethod ,
            },
          })
        )
      );
      return NextResponse.json({ redirectUrl: "/payment/success", success: true });    
      
    }
    if (!amount || !transactionId || !cartItems || !paymentMethod) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }
    
    const payload = {
      merchantId: MERCHANT_ID,
      merchantTransactionId: transactionId,
      merchantUserId: userId,
      amount: amount * 100, // Convert to paisa
      redirectUrl: `https://deccanhome.vercel.app/api/payment/callback/${transactionId}`,
      redirectMode: "REDIRECT",
      callbackUrl: `https://deccanhome.vercel.app/api/payment/callback/${transactionId}`,
      mobileNumber,
      paymentInstrument: {
        type: "PAY_PAGE",
      },
    };

    const payloadString = JSON.stringify(payload);
    const base64Payload = Buffer.from(payloadString).toString("base64");
    const hash = crypto.createHash("sha256").update(base64Payload + "/pg/v1/pay" + SALT_KEY).digest("hex");
    const xVerify = `${hash}###${SALT_INDEX}`;

    const response = await fetch(API_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-VERIFY": xVerify,
      },
      body: JSON.stringify({ request: base64Payload }),
    });

    const data = await response.json();

    await db.$transaction(
      cartItems.map((item: newcart) =>
        db.order.create({
          data: {
            userId,
            transactionId,
            amount,
            status: "PENDING",
            itemid: item.id,
            itemimage: item.imageString,
            itemname: item.name,
            itemquantity: item.quantity,
            itemcolor: item.color,
            paymentmode:paymentMethod ,
          },
        })
      )
    );
    
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error initiating payment:", error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const transactionId = searchParams.get("transactionId");
  if (!transactionId) return NextResponse.json({ error: "Missing transaction ID" }, { status: 400 });

  const checksum = crypto.createHash("sha256").update(`/pg/v1/status/${MERCHANT_ID}/${transactionId}${SALT_KEY}`).digest("hex");
  const xVerify = `${checksum}###${SALT_INDEX}`;

  const response = await fetch(`${STATUS_ENDPOINT}/${MERCHANT_ID}/${transactionId}`, {
    method: "GET",
    headers: {
      "X-VERIFY": xVerify,
      "X-MERCHANT-ID": MERCHANT_ID,
    },
  });

  const data = await response.json();
  return NextResponse.json(data);
}
