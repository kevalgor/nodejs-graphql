const typeDefs = `#graphql
  type LoginResponse {
    _id: String!
    email: String!
    mobile: String!
    token: String!
  }

  type User {
    _id: String!
    name: String!
    email: String!
    mobile: String!
  }

  type Product {
    _id: String!
    title: String!
    description: String!
    image: String!
    price: Int!
    category: String!
  }

  type CartItem {
    _id: String
    product: Product!
    user: User!
    quantity: Int!
  }

  input RegisterInput {
    name: String!
    email: String!
    mobile: String!
    password: String!
  }

  input LoginInput {
    email: String!
    password: String!
  }

  input UserInput {
    name: String
    email: String
    mobile: String
  }

  input CartItemInput {
    quantity: Int!
  }

  # Queries

  type Query {
    # user
    getUserById(userId: String!): User!

    # product
    getProducts: [Product!]!

    # cart
    getCartItems: [CartItem!]!
    getCartItemById(cartItemId: String!): CartItem!
  }

  # Mutations

  type Mutation {
    # auth
    register(registerInput: RegisterInput!): Boolean
    login(loginInput: LoginInput!): LoginResponse!

    # user
    updateUserById(userId: String!, userInput: UserInput!): User!

    # cart
    updateCartItemById(cartItemId: String!, cartItemInput: CartItemInput!): CartItem!
    deleteCartItemById(cartItemId: String!): Boolean
  }
`;

export { typeDefs };
