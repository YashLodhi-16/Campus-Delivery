import { NextResponse } from "next/server"

export async function POST(req) {
  try {
    const { user_json_url } = await req.json()

    if (!user_json_url?.startsWith("https://user.phone.email/")) {
      return NextResponse.json({ success: false }, { status: 400 })
    }

    const res = await fetch(user_json_url)
    const data = await res.json()

    const phone = `${data.user_country_code}${data.user_phone_number}`

    // ✅ VERIFIED phone number
    console.log("Verified Phone:", phone)

    // TODO:
    // 1. Save user in DB
    // 2. Create session / JWT

    return NextResponse.json({
      success: true,
      phone
    })
  } catch (e) {
    return NextResponse.json({ success: false }, { status: 500 })
  }
}
