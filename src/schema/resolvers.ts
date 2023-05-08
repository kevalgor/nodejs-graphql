import {
  authService,
  userService,
  productService,
  cartItemService,
} from "../service";

const resolvers = {
  Query: {
    ...userService.Query,
    ...productService.Query,
    ...cartItemService.Query,
  },
  Mutation: {
    ...authService.Mutation,
    ...userService.Mutation,
    ...cartItemService.Mutation,
  },
};

export { resolvers };
