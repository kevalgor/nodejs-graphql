import jwt from "jsonwebtoken";
import { IUser } from "../interface/user.interface";

const encodeUserData = (payload: IUser) => {
  return jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRY_TIME,
  });
};

const decodeUserData = (token: string) => {
  return jwt.verify(token, process.env.JWT_SECRET_KEY);
};

export default {
  encodeUserData,
  decodeUserData,
};
