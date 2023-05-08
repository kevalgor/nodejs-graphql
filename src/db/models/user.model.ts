import { model, Schema } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    mobile: {
      type: String,
    },
    password: {
      type: String,
    },
    active: {
      type: Boolean,
      default: true,
      index: true,
    },
  },
  {
    timestamps: true,
    methods: {
      async comparePassword(password: string): Promise<Boolean> {
        return bcrypt.compareSync(password, this.password);
      },
    },
  }
);

userSchema.index({ "$**": "text" });

// userSchema.methods = {
//   /**
//    * Compare given password with encrypted password of user
//    *
//    * @param {string} password
//    *
//    * @returns {Promise<Boolean>} - true if passwords are equal
//    */
//   async comparePassword(password: string): Promise<Boolean> {
//     return bcrypt.compare(password, this.password);
//   },
// };

export const UserModel = model("user", userSchema, "user");
