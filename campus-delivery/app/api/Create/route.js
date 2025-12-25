import { connectDB } from "@/lib/db"
import Order from "@/models/order"
import { NextResponse } from "next/server"

export async function POST(req) {
  const data = await req.json()
  await connectDB()

  const order = await Order.create(data)
  return NextResponse.json({ success: true, orderId: order._id })
}
