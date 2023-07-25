import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { HydratedDocument } from "mongoose";
import * as dotenv from "dotenv";
dotenv.config();
import { CommonService } from "../types/resolvers.types";
import { UserDocument, ILoginInput, IRegisterInput, IUser } from "../interface";
import { UserModel } from "../db/models/user.model";
import { errorHelper } from "../helpers";
import { httpErrorConstants, messageConstants } from "../constants";

const authService: CommonService<any, UserDocument | boolean> = {
  Mutation: {
    register: async (_, args) => {
      try {
        const userExist: HydratedDocument<UserDocument> =
          await UserModel.findOne({
            email: args.registerInput.email,
          });
        if (userExist) {
          errorHelper.throwCustomError(
            messageConstants.USER_ALREADY_EXIST,
            errorHelper.errorTypes.CONFLICT
          );
        }
        const hashedPassword = bcrypt.hashSync(args.registerInput.password, 10);
        const user: IRegisterInput = {
          name: args.registerInput.name,
          email: args.registerInput.email.toLowerCase(),
          mobile: args.registerInput.mobile,
          password: hashedPassword,
          address: args.registerInput.address,
        };
        await UserModel.create(user);
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
    login: async (_: any, args: { loginInput: ILoginInput }) => {
      try {
        const user: HydratedDocument<UserDocument> = await UserModel.findOne({
          email: args.loginInput.email,
          active: true,
        });
        if (!user) {
          errorHelper.throwCustomError(
            messageConstants.USERNAME_OR_PASSWORD_INVALID,
            errorHelper.errorTypes.UNAUTHORIZED
          );
        }
        const flag = await user.comparePassword(args.loginInput.password);
        if (!flag) {
          errorHelper.throwCustomError(
            messageConstants.USERNAME_OR_PASSWORD_INVALID,
            errorHelper.errorTypes.UNAUTHORIZED
          );
        }
        const payload: IUser = {
          _id: user._id.toString(),
          name: user.name.toString(),
          email: user.email.toString(),
          mobile: user.mobile.toString(),
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
          expiresIn: process.env.JWT_EXPIRY_TIME,
        });
        Object.assign(user, { token });
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
};

export { authService };
