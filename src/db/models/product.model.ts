import { model, Schema } from "mongoose";

const productSchema = new Schema(
  {
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    image: {
      type: String,
    },
    price: {
      type: Number,
    },
    category: {
      type: String,
    },
    active: {
      type: Boolean,
      default: true,
      index: true,
    },
  },
  { timestamps: true }
);

productSchema.index({ "$**": "text" });

export const ProductModel = model("product", productSchema, "product");
