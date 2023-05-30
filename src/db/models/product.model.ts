import { model, Schema } from "mongoose";
import { ProductDocument } from "../../interface/model.interface";

const schemaTypes = Schema.Types;

const productSchema = new Schema<ProductDocument>(
  {
    title: {
      type: schemaTypes.String,
      required: true,
    },
    description: {
      type: schemaTypes.String,
      required: true,
    },
    image: {
      type: schemaTypes.String,
      required: true,
    },
    price: {
      type: schemaTypes.Number,
      required: true,
    },
    category: {
      type: schemaTypes.String,
      required: true,
    },
    active: {
      type: schemaTypes.Boolean,
      default: true,
      index: true,
    },
  },
  { timestamps: true }
);

productSchema.index({ "$**": "text" });

export const ProductModel = model<ProductDocument>(
  "product",
  productSchema,
  "products"
);
