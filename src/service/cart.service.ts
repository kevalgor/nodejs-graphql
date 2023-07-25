import { HydratedDocument } from "mongoose";
import { CommonService } from "../types/resolvers.types";
import { CartDocument } from "../interface";
import { CartModel } from "../db/models/cart.model";
import { messageConstants, httpErrorConstants } from "../constants";
import { authHelper, errorHelper } from "../helpers";

const cartService: CommonService<any, CartDocument[] | CartDocument | boolean> =
  {
    Query: {
      getCart: async (_, {}, context) => {
        try {
          authHelper.checkAuth(context);
          const cart: HydratedDocument<CartDocument>[] = await CartModel.find({
            user: context.user._id,
          })
            .populate("product")
            .populate("user");
          return cart;
        } catch (err) {
          console.log("err: ", err);
          errorHelper.throwCustomError(
            err.message || messageConstants.INTERNAL_SERVER_ERROR,
            err?.extensions?.http
              ? errorHelper.errorTypes[
                  Object.keys(httpErrorConstants).find(
                    (key) => httpErrorConstants[key] === err.extensions.http
                  )
                ]
              : errorHelper.errorTypes.INTERNAL_SERVER_ERROR
          );
        }
      },
      getCartProduct: async (_, args, context) => {
        try {
          authHelper.checkAuth(context);
          const cartProduct: HydratedDocument<CartDocument> =
            await CartModel.findOne({
              _id: args.cartId,
            });
          if (!cartProduct) {
            errorHelper.throwCustomError(
              messageConstants.CART_PRODUCT_NOT_FOUND,
              errorHelper.errorTypes.NOT_FOUND
            );
          }
          return cartProduct;
        } catch (err) {
          console.log("err: ", err);
          errorHelper.throwCustomError(
            err.message || messageConstants.INTERNAL_SERVER_ERROR,
            err?.extensions?.http
              ? errorHelper.errorTypes[
                  Object.keys(httpErrorConstants).find(
                    (key) => httpErrorConstants[key] === err.extensions.http
                  )
                ]
              : errorHelper.errorTypes.INTERNAL_SERVER_ERROR
          );
        }
      },
    },
    Mutation: {
      addProductToCart: async (_, args, context) => {
        try {
          authHelper.checkAuth(context);
          const addProductToCart: HydratedDocument<CartDocument> =
            new CartModel({
              product: args.addProductToCartInput.product,
              user: args.addProductToCartInput.user,
              quantity: args.addProductToCartInput.quantity,
            });
          await addProductToCart.save();
          return true;
        } catch (err) {
          console.log("err: ", err);
          errorHelper.throwCustomError(
            err.message || messageConstants.INTERNAL_SERVER_ERROR,
            err?.extensions?.http
              ? errorHelper.errorTypes[
                  Object.keys(httpErrorConstants).find(
                    (key) => httpErrorConstants[key] === err.extensions.http
                  )
                ]
              : errorHelper.errorTypes.INTERNAL_SERVER_ERROR
          );
        }
      },
      updateCartProduct: async (_, args, context) => {
        try {
          authHelper.checkAuth(context);
          const cartProduct: HydratedDocument<CartDocument> =
            await CartModel.findOne({
              _id: args.cartId,
            });
          if (!cartProduct) {
            errorHelper.throwCustomError(
              messageConstants.CART_PRODUCT_NOT_FOUND,
              errorHelper.errorTypes.NOT_FOUND
            );
          }
          cartProduct.quantity =
            args.updateCartProductInput.quantity || cartProduct.quantity;
          await cartProduct.save();
          return true;
        } catch (err) {
          console.log("err: ", err);
          errorHelper.throwCustomError(
            err.message || messageConstants.INTERNAL_SERVER_ERROR,
            err?.extensions?.http
              ? errorHelper.errorTypes[
                  Object.keys(httpErrorConstants).find(
                    (key) => httpErrorConstants[key] === err.extensions.http
                  )
                ]
              : errorHelper.errorTypes.INTERNAL_SERVER_ERROR
          );
        }
      },
      deleteCartProduct: async (_, args, context) => {
        try {
          authHelper.checkAuth(context);
          const cartProduct: HydratedDocument<CartDocument> =
            await CartModel.findOne({
              _id: args.cartId,
            });
          if (!cartProduct) {
            errorHelper.throwCustomError(
              messageConstants.CART_PRODUCT_NOT_FOUND,
              errorHelper.errorTypes.NOT_FOUND
            );
          }
          await CartModel.deleteOne({
            _id: args.cartId,
          });
          return true;
        } catch (err) {
          console.log("err: ", err);
          errorHelper.throwCustomError(
            err.message || messageConstants.INTERNAL_SERVER_ERROR,
            err?.extensions?.http
              ? errorHelper.errorTypes[
                  Object.keys(httpErrorConstants).find(
                    (key) => httpErrorConstants[key] === err.extensions.http
                  )
                ]
              : errorHelper.errorTypes.INTERNAL_SERVER_ERROR
          );
        }
      },
    },
  };

export { cartService };
