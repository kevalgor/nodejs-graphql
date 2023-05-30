import { model, Schema } from "mongoose";
import { OrderDocument } from "../../interface/model.interface";

const schemaTypes = Schema.Types;

const orderSchema = new Schema<OrderDocument>(
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
    orderStatus: {
      type: schemaTypes.Number,
      required: true,
    },
    orderAmount: {
      type: schemaTypes.Number,
      required: true,
    },
    discount: {
      type: schemaTypes.Number,
    },
    paidAmount: {
      type: schemaTypes.Number,
      required: true,
    },
    deliveryAddress: {
      type: schemaTypes.String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

orderSchema.index({ "$**": "text" });

export const OrderModel = model<OrderDocument>("orders", orderSchema, "orders");
