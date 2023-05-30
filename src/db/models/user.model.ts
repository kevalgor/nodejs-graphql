import { model, Schema } from "mongoose";
import bcrypt from "bcrypt";
import { UserDocument } from "../../interface/model.interface";

const schemaTypes = Schema.Types;
const userSchema = new Schema<UserDocument>(
  {
    name: {
      type: schemaTypes.String,
      required: true,
    },
    email: {
      type: schemaTypes.String,
      required: true,
    },
    mobile: {
      type: schemaTypes.String,
      required: true,
    },
    address: {
      type: schemaTypes.String,
      required: true,
    },
    deliveryAddress: {
      type: schemaTypes.String,
    },
    password: {
      type: schemaTypes.String,
      required: true,
    },
    active: {
      type: schemaTypes.Boolean,
      default: true,
      index: true,
    },
  },
  {
    timestamps: true,
    methods: {
      async comparePassword(password: string): Promise<Boolean> {
        return bcrypt.compareSync(password, String(this.password));
      },
    },
  }
);

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

userSchema.index({ "$**": "text" });

export const UserModel = model<UserDocument>("user", userSchema, "users");
