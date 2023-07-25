import { ApolloServerErrorCode } from "@apollo/server/errors";
import { GraphQLError } from "graphql";
import { httpErrorConstants } from "../constants";
import { IErrorTypes } from "../interface/error.interface";

const errorTypes: IErrorTypes = {
  BAD_REQUEST: {
    errorCode:
      ApolloServerErrorCode.BAD_REQUEST ||
      ApolloServerErrorCode.GRAPHQL_VALIDATION_FAILED,
    errorStatus: httpErrorConstants.BAD_REQUEST,
  },
  UNAUTHORIZED: {
    errorCode: "UNAUTHORIZED",
    errorStatus: httpErrorConstants.UNAUTHORIZED,
  },
  FORBIDDEN: {
    errorCode: "FORBIDDEN",
    errorStatus: httpErrorConstants.FORBIDDEN,
  },
  NOT_FOUND: {
    errorCode: "NOT_FOUND",
    errorStatus: httpErrorConstants.NOT_FOUND,
  },
  CONFLICT: {
    errorCode: "CONFLICT",
    errorStatus: httpErrorConstants.CONFLICT,
  },
  INTERNAL_SERVER_ERROR: {
    errorCode: ApolloServerErrorCode.INTERNAL_SERVER_ERROR,
    errorStatus: httpErrorConstants.INTERNAL_SERVER_ERROR,
  },
};

const throwCustomError = (errorMessage: string, errorType: any) => {
  throw new GraphQLError(errorMessage, {
    extensions: {
      code: errorType.errorCode,
      http: errorType.errorStatus,
    },
  });
};

export default {
  errorTypes,
  throwCustomError,
};
