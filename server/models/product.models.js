import { Schema, model } from "mongoose";

const productSchema = new Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true, maxlength: 500 },
  price: { type: Number, required: true, min: 0 },
  stock: { type: Number, required: true, min: 0 },
  reviews: { type: Number, default: 0, min: 0, max: 5 },
  sizes: { type: [Number], required: true },
  image: { type: String, required: true },
  brand: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export const productModel = model("Product", productSchema);
