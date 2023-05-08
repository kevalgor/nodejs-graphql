import { UserModel } from "../db/models/user.model";
import { User, UserInput } from "../interface/user.interface";
import { httpErrorConstants, messageConstants } from "../constants";
import { throwCustomError, ErrorTypes } from "../helper/error.helper";

const userService = {
  Query: {
    getUserById: async (_: any, args: { userId: string }) => {
      try {
        const user: User = await UserModel.findOne({
          _id: args.userId,
          active: true,
        });
        if (!user) {
          throwCustomError(
            messageConstants.USER_NOT_FOUND,
            ErrorTypes.NOT_FOUND
          );
        }
        return user;
      } catch (err) {
        console.log("err: ", err);
        switch (true) {
          case err.extensions.http === httpErrorConstants.NOT_FOUND:
            throwCustomError(err, ErrorTypes.NOT_FOUND);
            break;
          default:
            throwCustomError(
              messageConstants.INTERNAL_SERVER_ERROR,
              ErrorTypes.INTERNAL_SERVER_ERROR
            );
        }
      }
    },
  },
  Mutation: {
    updateUserById: async (
      _: any,
      args: {
        userId: string;
        userInput: UserInput;
      }
    ) => {
      try {
        const userExist = await UserModel.findOne({
          _id: args.userId,
          active: true,
        });
        if (!userExist) {
          throwCustomError(
            messageConstants.USER_NOT_FOUND,
            ErrorTypes.NOT_FOUND
          );
        }
        userExist.name = args.userInput.name || userExist.name;
        userExist.email = args.userInput.email || userExist.email;
        userExist.mobile = args.userInput.mobile || userExist.mobile;
        const result = await userExist.save();
        return result;
      } catch (err) {
        console.log("err: ", err);
        switch (true) {
          case err.extensions.http === httpErrorConstants.NOT_FOUND:
            throwCustomError(err, ErrorTypes.NOT_FOUND);
            break;
          default:
            throwCustomError(
              messageConstants.INTERNAL_SERVER_ERROR,
              ErrorTypes.INTERNAL_SERVER_ERROR
            );
        }
      }
    },
  },
};

export { userService };
