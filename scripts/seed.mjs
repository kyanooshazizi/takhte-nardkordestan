import mongoose from "mongoose";

const items = [
  ["تخته نرد چوب گردو سلطنتی", "walnut-royal", 4800000, "چوبی", "بزرگ", 4.9],
  ["تخته نرد چرمی مسافرتی", "leather-travel", 1450000, "چرمی", "کوچک", 4.6],
  ["تخته نرد مغناطیسی جیبی", "magnetic-pocket", 690000, "مغناطیسی", "کوچک", 4.3],
  ["تخته نرد چوب راش کلاسیک", "beech-classic", 2350000, "چوبی", "متوسط", 4.7],
  ["تخته نرد چرم سنتی دست‌دوز", "leather-handmade", 3200000, "چرمی", "متوسط", 4.8],
  ["تخته نرد مینیاتوری خاتم", "khatam-mini", 5900000, "مینیاتوری", "متوسط", 4.9],
  ["تخته نرد چوب بلوط بزرگ", "oak-large", 3900000, "چوبی", "بزرگ", 4.5],
  ["تخته نرد مغناطیسی خانواده", "magnetic-family", 1100000, "مغناطیسی", "بزرگ", 4.2],
].map(([name, slug, price, material, size, rating]) => ({
  name, slug, price, material, size, rating,
  stock: 12,
  description: `${name}؛ ساخته‌شده با مواد باکیفیت و مناسب هم برای بازی روزمره و هم هدیه. شامل ۳۰ مهره، ۴ تاس و ضمانت اصالت.`,
  createdAt: new Date(), updatedAt: new Date(),
}));

await mongoose.connect(process.env.MONGODB_URI);
const col = mongoose.connection.collection("products");
await col.deleteMany({});
await col.insertMany(items);
console.log(`${items.length} محصول اضافه شد`);
await mongoose.disconnect();
