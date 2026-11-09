import Link from "next/link";
import { fa } from "@/lib/products";

export default function ProductCard({ p }) {
  return (
    <Link href={`/products/${p.slug}`} className="card">
      <div className="thumb" aria-hidden>🎲</div>
      <h3>{p.name}</h3>
      <p className="meta">{p.material} – سایز {p.size}</p>
      <p className="price">{fa(p.price)} تومان</p>
    </Link>
  );
}
