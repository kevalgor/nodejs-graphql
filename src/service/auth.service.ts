import bcrypt from "bcrypt";
import * as dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";
import { UserModel } from "../db/models/user.model";
import { LoginInput, RegisterInput } from "../interface/auth.interface";
import { User } from "../interface/user.interface";
import { throwCustomError, ErrorTypes } from "../helper/error.helper";
import { httpErrorConstants, messageConstants } from "../constants";

const authService = {
  Mutation: {
    register: async (
      _: any,
      args: {
        registerInput: RegisterInput;
      }
    ) => {
      try {
        const userExist: User = await UserModel.findOne({
          email: args.registerInput.email,
        });
        if (userExist) {
          throwCustomError(
            messageConstants.USER_ALREADY_EXIST,
            ErrorTypes.CONFLICT
          );
        }
        const hashedPassword = bcrypt.hashSync(args.registerInput.password, 10);
        const user: RegisterInput = {
          name: args.registerInput.name,
          email: args.registerInput.email.toLowerCase(),
          mobile: args.registerInput.mobile,
          password: hashedPassword,
        };
        await UserModel.create(user);
        return true;
      } catch (err) {
        console.log("err: ", err);
        switch (true) {
          case err.extensions.http === httpErrorConstants.CONFLICT:
            throwCustomError(err, ErrorTypes.CONFLICT);
            break;
          default:
            throwCustomError(
              messageConstants.INTERNAL_SERVER_ERROR,
              ErrorTypes.INTERNAL_SERVER_ERROR
            );
        }
      }
    },
    login: async (_: any, args: { loginInput: LoginInput }) => {
      try {
        const user = await UserModel.findOne({ email: args.loginInput.email });
        if (!user) {
          throwCustomError(
            messageConstants.USERNAME_OR_PASSWORD_INVALID,
            ErrorTypes.UNAUTHORIZED
          );
        }
        const flag = await user.comparePassword(args.loginInput.password);
        if (!flag) {
          throwCustomError(
            messageConstants.USERNAME_OR_PASSWORD_INVALID,
            ErrorTypes.UNAUTHORIZED
          );
        }
        const payload: User = {
          _id: user._id.toString(),
          name: user.name,
          email: user.email,
          mobile: user.mobile,
        };
        const token: string = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
          expiresIn: process.env.JWT_EXPIRY_TIME,
        });
        Object.assign(user, { token });
        return user;
      } catch (err) {
        console.log("err: ", err);
        switch (true) {
          case err.extensions.http === httpErrorConstants.UNAUTHORIZED:
            throwCustomError(err, ErrorTypes.UNAUTHORIZED);
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

export { authService };
