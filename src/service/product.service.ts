import { HydratedDocument } from "mongoose";
import { CommonService } from "../types/resolvers.types";
import { ProductDocument } from "../interface";
import { ProductModel } from "../db/models/product.model";
import { messageConstants, httpErrorConstants } from "../constants";
import { errorHelper } from "../helpers";

const productService: CommonService<any, ProductDocument[] | ProductDocument> =
  {
    Query: {
      getProducts: async () => {
        try {
          const products: HydratedDocument<ProductDocument>[] =
            await ProductModel.find({ active: true });
          return products;
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
      getProduct: async (_, args) => {
        try {
          const product: HydratedDocument<ProductDocument> =
            await ProductModel.findOne({
              _id: args.productId,
              active: true,
            });
          if (!product) {
            errorHelper.throwCustomError(
              messageConstants.PRODUCT_NOT_FOUND,
              errorHelper.errorTypes.NOT_FOUND
            );
          }
          return product;
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

export { productService };
