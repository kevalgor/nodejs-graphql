import { HydratedDocument } from "mongoose";
import { CommonService } from "../types/resolvers.types";
import { UserDocument } from "../interface";
import { UserModel } from "../db/models/user.model";
import { httpErrorConstants, messageConstants } from "../constants";
import { errorHelper } from "../helpers";

const userService: CommonService<any, UserDocument | boolean> = {
  Query: {
    getUser: async (_, args) => {
      try {
        const user: HydratedDocument<UserDocument> = await UserModel.findOne({
          _id: args.userId,
          active: true,
        });
        if (!user) {
          errorHelper.throwCustomError(
            messageConstants.USER_NOT_FOUND,
            errorHelper.errorTypes.NOT_FOUND
          );
        }
        return user;
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
    updateUserInformation: async (_, args) => {
      try {
        const userExist: HydratedDocument<UserDocument> =
          await UserModel.findOne({
            _id: args.userId,
            active: true,
          });
        if (!userExist) {
          errorHelper.throwCustomError(
            messageConstants.USER_NOT_FOUND,
            errorHelper.errorTypes.NOT_FOUND
          );
        }
        userExist.name = args.updateUserInformationInput.name || userExist.name;
        userExist.mobile =
          args.updateUserInformationInput.mobile || userExist.mobile;
        userExist.address =
          args.updateUserInformationInput.address || userExist.address;
        userExist.deliveryAddress =
          args.updateUserInformationInput.deliveryAddress ||
          userExist.deliveryAddress;
        await userExist.save();
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

export { userService };
