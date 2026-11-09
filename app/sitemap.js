import { findProducts } from "@/lib/products";

export default async function sitemap() {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const products = await findProducts();
  return [
    { url: base, changeFrequency: "daily" },
    ...products.map((p) => ({ url: `${base}/products/${p.slug}` })),
  ];
}
