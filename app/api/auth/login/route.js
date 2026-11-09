import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connect } from "@/lib/db";
import User from "@/models/User";
import { signToken, withAuthCookie } from "@/lib/auth";

export async function POST(req) {
  const { email, password } = await req.json();
  await connect();
  const user = await User.findOne({ email: (email || "").toLowerCase() });
  if (!user || !(await bcrypt.compare(password || "", user.password)))
    return NextResponse.json({ error: "ایمیل یا رمز عبور اشتباه است." }, { status: 401 });

  return withAuthCookie(NextResponse.json({ ok: true }), signToken(user));
}
