import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export const signToken = (user) =>
  jwt.sign({ id: String(user._id), name: user.name }, process.env.JWT_SECRET, { expiresIn: "7d" });

export async function getUser() {
  const token = (await cookies()).get("token")?.value;
  if (!token) return null;
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    return null;
  }
}

export function withAuthCookie(res, token) {
  res.cookies.set("token", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });
  return res;
}
