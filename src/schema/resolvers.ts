import { CommonService } from "../types/resolvers.types";
import {
  authService,
  userService,
  productService,
  cartService,
  wishlistService,
  orderService,
} from "../service";
import {
  UserDocument,
  ProductDocument,
  CartDocument,
  WishlistDocument,
  OrderDocument,
} from "../interface";

const resolvers: CommonService<
  any,
  | UserDocument
  | ProductDocument
  | ProductDocument[]
  | CartDocument
  | CartDocument[]
  | WishlistDocument
  | WishlistDocument[]
  | OrderDocument
  | OrderDocument[]
  | boolean
> = {
  Query: {
    ...userService.Query,
    ...productService.Query,
    ...cartService.Query,
    ...wishlistService.Query,
    ...orderService.Query,
  },
  Mutation: {
    ...authService.Mutation,
    ...userService.Mutation,
    ...cartService.Mutation,
    ...wishlistService.Mutation,
    ...orderService.Mutation,
  },
};

export { resolvers };
