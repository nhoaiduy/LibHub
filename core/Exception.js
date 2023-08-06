import { print, OutputType } from "../utils/helpers/print.js";
export default class Exception extends Error {
  static WRONG_DB_USERNAME_PASSWORD = "Wrong database's username or password";
  static WRONG_SERVER_NAME_CONNECTION_STRING =
    "Wrong server name/connection string";
  static CANNOT_CONNECT_TO_MONGOOSE = "Cannot connect to Mongoose";
  static USER_EXIST = "User already exists";
  static CANNOT_REGISTER_USER = "Cannot register user";
  static UNREGISTER_USER = "User is unregistered";
  static WRONG_PASSWORD = "Wrong password";
  static ID_NOT_DEFINED = "Id is not defined";

  constructor(msg) {
    super(msg);
    print(msg, OutputType.E);
  }
}
