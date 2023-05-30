import { model, Schema } from "mongoose";
import { WishlistDocument } from "../../interface/model.interface";

const schemaTypes = Schema.Types;

const wishlistSchema = new Schema<WishlistDocument>(
  {
    product: {
      type: schemaTypes.ObjectId,
      ref: "product",
      required: true,
    },
    user: {
      type: schemaTypes.ObjectId,
      ref: "user",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

wishlistSchema.index({ "$**": "text" });

export const WishlistModel = model<WishlistDocument>(
  "wishlist",
  wishlistSchema,
  "wishlist"
);
