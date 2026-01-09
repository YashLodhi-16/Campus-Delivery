import { NextResponse } from "next/server";
import { payuClient } from "../../../../lib/paymentGateway";

export async function POST(req) {
  try {
    const {
      amount,
      firstName,
      email,
      phone,
      orderId,
      address,
      pg,
      productInfo = "payu",
      city = "Delhi",
      state = "Delhi",
      country = "India",
      surl = "http://localhost:3000/receipt?orderId=" + orderId,
      furl = "http://localhost:3000/payment-failed?orderId=" + orderId,
    } = await req.json();

    const form = payuClient.paymentInitiate({
      txnid: orderId,
      amount: `${amount.toString()}.00`,
      firstname: firstName,
      email,
      phone,
      surl,
      furl,
      city,
      state,
      address,
      productinfo: productInfo,
      country,
      enforce_paymethod: pg,
    });

    return NextResponse.json({ success: true, form });
  } catch (e) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
