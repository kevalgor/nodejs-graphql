import { Document, Schema } from "mongoose";

export interface UserDocument extends Document {
  name: Schema.Types.String;
  email: Schema.Types.String;
  mobile: Schema.Types.String;
  address: Schema.Types.String;
  deliveryAddress?: Schema.Types.String;
  password: Schema.Types.String;
  active: Schema.Types.Boolean;
  comparePassword(password: string): Promise<boolean>;
}

export interface ProductDocument extends Document {
  title: Schema.Types.String;
  description: Schema.Types.String;
  image: Schema.Types.String;
  price: Schema.Types.Number;
  category: Schema.Types.String;
  active: Schema.Types.Boolean;
}

export interface CartDocument extends Document {
  product: Schema.Types.ObjectId;
  user: Schema.Types.ObjectId;
  quantity: Schema.Types.Number;
}

export interface WishlistDocument extends Document {
  product: Schema.Types.ObjectId;
  user: Schema.Types.ObjectId;
}

export interface OrderDocument extends Document {
  product: Schema.Types.ObjectId;
  user: Schema.Types.ObjectId;
  quantity: Schema.Types.Number;
  orderStatus: Schema.Types.Number;
  orderAmount: Schema.Types.Number;
  discount?: Schema.Types.Number;
  paidAmount: Schema.Types.Number;
  deliveryAddress: Schema.Types.String;
}
