import ProductCard from "@/components/ProductCard";
import { findProducts } from "@/lib/products";

export const dynamic = "force-dynamic"; // رندر سمت سرور در هر درخواست

const MATERIALS = ["چوبی", "چرمی", "مغناطیسی", "مینیاتوری"];
const SIZES = ["کوچک", "متوسط", "بزرگ"];

export default async function Home({ searchParams }) {
  const sp = await searchParams;
  const products = await findProducts(sp);

  return (
    <main>
      <section className="hero">
        <div className="wrap">
          <h1>تخته‌نردی که سال‌ها با شما بماند</h1>
          <p>از مدل‌های مسافرتی تا تخته‌های چوب گردو؛ فیلتر کنید و مناسب‌ترین را پیدا کنید.</p>
        </div>
        <div className="points" aria-hidden />
      </section>

      <div className="wrap layout">
        <form className="filters" method="get">
          <h2>فیلتر محصولات</h2>
          <label>جستجو<input name="q" defaultValue={sp.q} placeholder="نام محصول" /></label>
          <label>جنس
            <select name="material" defaultValue={sp.material || ""}>
              <option value="">همه</option>
              {MATERIALS.map((m) => <option key={m}>{m}</option>)}
            </select>
          </label>
          <label>سایز
            <select name="size" defaultValue={sp.size || ""}>
              <option value="">همه</option>
              {SIZES.map((s) => <option key={s}>{s}</option>)}
            </select>
          </label>
          <div className="row">
            <label>از (تومان)<input name="min" type="number" min="0" defaultValue={sp.min} dir="ltr" /></label>
            <label>تا (تومان)<input name="max" type="number" min="0" defaultValue={sp.max} dir="ltr" /></label>
          </div>
          <label>مرتب‌سازی
            <select name="sort" defaultValue={sp.sort || "new"}>
              <option value="new">جدیدترین</option>
              <option value="price-asc">ارزان‌ترین</option>
              <option value="price-desc">گران‌ترین</option>
              <option value="rating">بیشترین امتیاز</option>
            </select>
          </label>
          <button className="btn">اعمال فیلتر</button>
          <a href="/" className="meta">پاک‌کردن فیلترها</a>
        </form>

        <section>
          <p className="meta">{products.length.toLocaleString("fa-IR")} محصول</p>
          {products.length ? (
            <div className="grid">{products.map((p) => <ProductCard key={p.id} p={p} />)}</div>
          ) : (
            <p className="empty">محصولی با این فیلترها پیدا نشد. محدوده قیمت یا جنس را تغییر دهید.</p>
          )}
        </section>
      </div>
    </main>
  );
}
