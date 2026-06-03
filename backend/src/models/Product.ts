import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    modelNo: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    currentPrice: { type: Number, required: true },
    stock: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);