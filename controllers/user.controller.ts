import crypto from "crypto";

import User, { userProperties } from "../models/user.model";

const md5hash = (str: string) =>
  crypto.createHash("md5").update(str).digest("hex");

const userController = {
  create: async (userData: typeof userProperties & { password: string }) => {
    const { name, email, password } = userData;

    const hash = md5hash(password);

    const doc = await User.create({ name, email, hash });

    return doc?.toObject();
  },
  getById: async (userId: string) => {
    const doc = await User.findOne({ _id: userId });

    return doc?.toObject();
  },
};
export default userController;