import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { amount } = await request.json();

    if (!amount || Number(amount) <= 0) {
      return NextResponse.json(
        { error: "Invalid amount" },
        { status: 400 }
      );
    }

    const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!keyId || !keySecret) {
      return NextResponse.json(
        { error: "Razorpay keys are not configured" },
        { status: 500 }
      );
    }

    const auth = Buffer.from(
      `${keyId}:${keySecret}`
    ).toString("base64");

    const response = await fetch(
      "https://api.razorpay.com/v1/orders",
      {
        method: "POST",
        headers: {
          Authorization: `Basic ${auth}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: Math.round(Number(amount) * 100),
          currency: "INR",
          receipt: `ytr_${Date.now()}`,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("Razorpay error:", data);

      return NextResponse.json(
        { error: data?.error?.description || "Razorpay error" },
        { status: response.status }
      );
    }

    return NextResponse.json({
      orderId: data.id,
      amount: data.amount,
      currency: data.currency,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Unable to create Razorpay order" },
      { status: 500 }
    );
  }
}