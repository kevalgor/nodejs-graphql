import { ProductModel } from "../db/models/product.model";

const productService = {
  Query: {
    getProducts: async () => {
      try {
        const products = await ProductModel.find({ active: true });
        return products;
      } catch (err) {
        console.log("err: ", err);
        throw new Error("Internal server error.");
      }
    },
  },
};

export { productService };
