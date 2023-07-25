const typeDefs = `#graphql
  type LoginResponse {
    _id: String!
    name: String!
    email: String!
    mobile: String!
    address: String!
    deliveryAddress: String!
    token: String!
  }

  type User {
    _id: String!
    name: String!
    email: String!
    mobile: String!
    address: String
    deliveryAddress: String
  }

  type Product {
    _id: String!
    title: String!
    description: String!
    image: String!
    price: Float!
    category: String!
  }

  type Cart {
    _id: String
    product: Product!
    user: User!
    quantity: Int!
  }

  type Wishlist {
    _id: String!
    product: Product!
    user: User!
  }

  type Order {
    _id: String!
    product: Product!
    user: User!
    quantity: Int!
    orderStatus: Int!
    orderAmount: Float!
    discount: Float
    paidAmount: Float!
    deliveryAddress: String!
  }

  input RegisterInput {
    name: String!
    email: String!
    mobile: String!
    password: String!
    address: String!
  }

  input LoginInput {
    email: String!
    password: String!
  }

  input UpdateUserInformationInput {
    name: String
    mobile: String
    address: String
    deliveryAddress: String
  }

  input AddProductToCartInput {
    product: String!
    user: String!
    quantity: Int!
  }

  input UpdateCartProductInput {
    quantity: Int!
  }

  input AddProductToWishlistInput {
    product: String!
    user: String!
  }

  input CompleteOrderInput {
    product: String!
    user: String!
    quantity: Int!,
    orderAmount: Float!,
    discount: Float,
    paidAmount: Float!,
    deliveryAddress: String!,
  }

  # Queries

  type Query {
    # user
    getUserInformation(userId: String!): User!

    # product
    getProducts: [Product!]!
    getProduct(productId: String!): Product!

    # cart
    getCart: [Cart!]!
    getCartProduct(cartId: String!): Cart!

    # wishlist
    getWishlist: [Wishlist!]!
    getWishlistProduct(wishlistId: String!): Wishlist!

    # order
    getOrders: [Order!]!
    getOrder(orderId: String!): Order!
  }

  # Mutations

  type Mutation {
    # auth
    register(registerInput: RegisterInput!): Boolean!
    login(loginInput: LoginInput!): LoginResponse!

    # user
    updateUserInformation(userId: String!, updateUserInformationInput: UpdateUserInformationInput!): Boolean!

    # cart
    addProductToCart(addProductToCartInput: AddProductToCartInput!): Boolean!
    updateCartProduct(cartId: String!, updateCartProductInput: UpdateCartProductInput!): Boolean!
    deleteCartProduct(cartId: String!): Boolean!

    # wishlist
    addProductToWishlist(addProductToWishlistInput: AddProductToWishlistInput!): Boolean!
    deleteWishlistProduct(wishlistId: String!): Boolean!

    # order
    completeOrder(completeOrderInput: CompleteOrderInput!): Boolean!
  }
`;

export { typeDefs };
