import { HydratedDocument } from "mongoose";
import { CommonService } from "../types/resolvers.types";
import { WishlistDocument } from "../interface";
import { WishlistModel } from "../db/models/wishlist.model";
import { messageConstants, httpErrorConstants } from "../constants";
import { errorHelper } from "../helpers";

const wishlistService: CommonService<
  any,
  WishlistDocument | WishlistDocument[] | boolean
> = {
  Query: {
    getWishlist: async () => {
      try {
        const wishlist: HydratedDocument<WishlistDocument>[] =
          await WishlistModel.find().populate("product").populate("user");
        return wishlist;
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
    getWishlistProduct: async (_, args) => {
      try {
        const wishlistProduct: HydratedDocument<WishlistDocument> =
          await WishlistModel.findOne({
            _id: args.wishlistId,
          });
        if (!wishlistProduct) {
          errorHelper.throwCustomError(
            messageConstants.WISHLIST_PRODUCT_NOT_FOUND,
            errorHelper.errorTypes.NOT_FOUND
          );
        }
        return wishlistProduct;
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
    addProductToWishlist: async (_, args) => {
      try {
        const addProductToWishlist: HydratedDocument<WishlistDocument> =
          new WishlistModel({
            product: args.addProductToWishlistInput.product,
            user: args.addProductToWishlistInput.user,
          });
        await addProductToWishlist.save();
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
    deleteWishlistProduct: async (_, args) => {
      try {
        const wishlistProduct: HydratedDocument<WishlistDocument> =
          await WishlistModel.findOne({
            _id: args.wishlistId,
          });
        if (!wishlistProduct) {
          errorHelper.throwCustomError(
            messageConstants.WISHLIST_PRODUCT_NOT_FOUND,
            errorHelper.errorTypes.NOT_FOUND
          );
        }
        await WishlistModel.deleteOne({
          _id: args.wishlistId,
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

export { wishlistService };
