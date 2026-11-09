import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    price: { type: Number, required: true }, // تومان
    material: { type: String, index: true }, // چوبی، چرمی، ...
    size: { type: String, index: true }, // کوچک، متوسط، بزرگ
    description: String,
    stock: { type: Number, default: 10 },
    rating: { type: Number, default: 4.5 },
  },
  { timestamps: true }
);

export default mongoose.models.Product || mongoose.model("Product", schema);
