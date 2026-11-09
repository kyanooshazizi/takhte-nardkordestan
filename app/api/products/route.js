import { NextResponse } from "next/server";
import { findProducts } from "@/lib/products";

export async function GET(req) {
  const sp = Object.fromEntries(new URL(req.url).searchParams);
  return NextResponse.json(await findProducts(sp));
}
