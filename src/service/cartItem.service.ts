import { CartItemModel } from "../db/models/cartItem.model";
import { CartItemInput } from "../interface/cartItem.interface";

const cartItemService = {
  Query: {
    getCartItems: async () => {
      try {
        const cartItems = await CartItemModel.find({ active: true });
        return cartItems;
      } catch (err) {
        console.log("err: ", err);
        throw new Error("Internal server error.");
      }
    },
    getCartItemById: async (_: any, args: { cartItemId: string }) => {
      try {
        const cartItem = await CartItemModel.findOne({
          _id: args.cartItemId,
          active: true,
        });
        return cartItem;
      } catch (err) {
        console.log("err: ", err);
        throw new Error("Internal server error.");
      }
    },
  },
  Mutation: {
    updateCartItemById: async (
      _: any,
      args: { cartItemId: string; cartItemInput: CartItemInput }
    ) => {
      try {
        const updateCartItem = {
          quantity: args.cartItemInput.quantity,
        };
        const result = await CartItemModel.findOneAndUpdate(
          { _id: args.cartItemId },
          updateCartItem,
          { new: true }
        );
        return result;
      } catch (err) {
        console.log("err: ", err);
        throw new Error("Internal server error.");
      }
    },
    deleteCartItemById: async (_: any, args: { cartItemId: string }) => {
      try {
        await CartItemModel.findOneAndDelete({
          _id: args.cartItemId,
        });
        return true;
      } catch (err) {
        console.log("err: ", err);
        throw new Error("Internal server error.");
      }
    },
  },
};

export { cartItemService };
