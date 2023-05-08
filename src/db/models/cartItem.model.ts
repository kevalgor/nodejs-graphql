import { model, Schema } from "mongoose";

const cartItemSchema = new Schema(
  {
    productId: {
      type: Schema.Types.ObjectId,
      ref: "product",
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    quantity: {
      type: Number,
    },
    active: {
      type: Boolean,
      default: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

cartItemSchema.index({ "$**": "text" });

export const CartItemModel = model("cartItem", cartItemSchema, "cartItem");
