import { model, Schema } from "mongoose";
import { CartDocument } from "../../interface/model.interface";

const schemaTypes = Schema.Types;

const cartSchema = new Schema<CartDocument>(
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
    quantity: {
      type: schemaTypes.Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// /**
//  * Function used to pre populate nested items
//  * @param field
//  * @returns
//  */
// export const Populate = (
//   field: Array<Record<string, any>> | Record<string, any>
// ) =>
//   function (next: CallbackWithoutResultAndOptionalError) {
//     this.populate(field);
//     next();
//   };

// cartSchema.pre(
//   "findOne",
//   Populate([
//     {
//       path: "user",
//       match: { active: true },
//     },
//     {
//       path: "product",
//       match: { active: true },
//     },
//   ])
// );

cartSchema.index({ "$**": "text" });

export const CartModel = model<CartDocument>("carts", cartSchema, "carts");
