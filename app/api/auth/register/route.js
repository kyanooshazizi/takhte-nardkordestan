import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connect } from "@/lib/db";
import User from "@/models/User";
import { signToken, withAuthCookie } from "@/lib/auth";

export async function POST(req) {
  const { name, email, password } = await req.json();
  if (!name || !/^\S+@\S+\.\S+$/.test(email || "") || (password || "").length < 6)
    return NextResponse.json({ error: "نام، ایمیل معتبر و رمز حداقل ۶ کاراکتری وارد کنید." }, { status: 400 });

  await connect();
  if (await User.findOne({ email: email.toLowerCase() }))
    return NextResponse.json({ error: "این ایمیل قبلاً ثبت شده است." }, { status: 409 });

  const user = await User.create({ name, email, password: await bcrypt.hash(password, 10) });
  return withAuthCookie(NextResponse.json({ ok: true }), signToken(user));
}
