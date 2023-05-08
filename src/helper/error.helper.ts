import { ApolloServerErrorCode } from "@apollo/server/errors";
import { GraphQLError } from "graphql";

export const ErrorTypes = {
  BAD_REQUEST: {
    errorCode:
      ApolloServerErrorCode.BAD_REQUEST ||
      ApolloServerErrorCode.GRAPHQL_VALIDATION_FAILED,
    errorStatus: 400,
  },
  UNAUTHORIZED: {
    errorCode: "UNAUTHORIZED",
    errorStatus: 401,
  },
  FORBIDDEN: {
    errorCode: "FORBIDDEN",
    errorStatus: 403,
  },
  NOT_FOUND: {
    errorCode: "NOT_FOUND",
    errorStatus: 404,
  },
  CONFLICT: {
    errorCode: "CONFLICT",
    errorStatus: 409,
  },
  INTERNAL_SERVER_ERROR: {
    errorCode: ApolloServerErrorCode.INTERNAL_SERVER_ERROR,
    errorStatus: 500,
  },
};

export const throwCustomError = (errorMessage: any, errorType: any) => {
  throw new GraphQLError(errorMessage, {
    extensions: {
      code: errorType.errorCode,
      http: errorType.errorStatus,
    },
  });
};
