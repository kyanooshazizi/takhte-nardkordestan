import { connect } from "./db";
import Product from "@/models/Product";

const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const SORTS = { new: { createdAt: -1 }, "price-asc": { price: 1 }, "price-desc": { price: -1 }, rating: { rating: -1 } };

export async function findProducts(sp = {}) {
  await connect();
  const q = {};
  if (sp.q) q.name = { $regex: esc(sp.q), $options: "i" };
  if (sp.material) q.material = sp.material;
  if (sp.size) q.size = sp.size;
  if (sp.min || sp.max) {
    q.price = {};
    if (sp.min) q.price.$gte = Number(sp.min);
    if (sp.max) q.price.$lte = Number(sp.max);
  }
  const docs = await Product.find(q).sort(SORTS[sp.sort] || SORTS.new).lean();
  return docs.map(({ _id, __v, createdAt, updatedAt, ...p }) => ({ id: String(_id), ...p }));
}

export async function findProduct(slug) {
  await connect();
  const p = await Product.findOne({ slug }).lean();
  if (!p) return null;
  const { _id, __v, createdAt, updatedAt, ...rest } = p;
  return { id: String(_id), ...rest };
}

export const fa = (n) => Number(n).toLocaleString("fa-IR");
