import { notFound } from "next/navigation";
import { findProduct, fa } from "@/lib/products";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const p = await findProduct((await params).slug);
  if (!p) return {};
  return {
    title: p.name,
    description: p.description?.slice(0, 150),
    alternates: { canonical: `/products/${p.slug}` },
    openGraph: { title: p.name, description: p.description?.slice(0, 150) },
  };
}

export default async function ProductPage({ params }) {
  const p = await findProduct((await params).slug);
  if (!p) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.name,
    description: p.description,
    aggregateRating: { "@type": "AggregateRating", ratingValue: p.rating, reviewCount: 10 },
    offers: {
      "@type": "Offer",
      priceCurrency: "IRR",
      price: p.price * 10,
      availability: p.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
    },
  };

  return (
    <main className="wrap detail">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="thumb big" aria-hidden>🎲</div>
      <article>
        <h1>{p.name}</h1>
        <p className="price big">{fa(p.price)} تومان</p>
        <dl>
          <dt>جنس</dt><dd>{p.material}</dd>
          <dt>سایز</dt><dd>{p.size}</dd>
          <dt>امتیاز</dt><dd>{fa(p.rating)} از ۵</dd>
          <dt>موجودی</dt><dd>{p.stock > 0 ? `${fa(p.stock)} عدد` : "ناموجود"}</dd>
        </dl>
        <p>{p.description}</p>
        <button className="btn" disabled={p.stock <= 0}>افزودن به سبد خرید</button>
      </article>
    </main>
  );
}
