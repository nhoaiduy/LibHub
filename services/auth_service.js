import { User } from "../models/index.js";
import Exception from "../core/Exception.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const login = async ({ email, password }) => {
  let existUser = await User.findOne({ email }).exec();
  if (existUser == null) {
    throw new Exception(Exception.UNREGISTER_USER);
  }
  const isMatched = await bcrypt.compare(password, existUser.password);
  if (isMatched) {
    let token = jwt.sign(
      {
        data: existUser,
      },
      process.env.JWT_KEY,
      {
        expiresIn: "8h",
      }
    );

    return {
      userId: existUser.toObject()._id,
      username: existUser.toObject().name,
      token: token,
    };
  } else {
    throw new Exception(Exception.WRONG_PASSWORD);
  }
};

const register = async ({
  email,
  password,
  fullName,
  phoneNumber,
  address,
  gender,
  birthDate,
  expiryDate,
}) => {
  let existUser = await User.findOne({ email }).exec();
  if (existUser != null) {
    throw new Exception(Exception.USER_EXIST);
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({
    fullName,
    email,
    password: hashedPassword,
    phoneNumber,
    address,
    gender,
    birthDate,
    expiryDate,
  });
  return {
    userId: newUser._doc._id,
  };
};

export default { login, register };
