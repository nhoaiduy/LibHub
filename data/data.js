import mongoose from "mongoose";
import { print, OutputType } from "../utils/helpers/print.js";
import Exception from "../core/Exception.js";
mongoose.set("strictQuery", true);

const connect = async () => {
  try {
    let connection = await mongoose.connect(process.env.MONGO_URL);
    print("Successful mongoose connection", OutputType.S);
  } catch (err) {
    const { code } = err;
    if (code === 8000) {
      throw new Exception(Exception.WRONG_DB_USERNAME_PASSWORD);
    } else if (code === "ENOTFOND") {
      throw new Exception(Exception.WRONG_SERVER_NAME_CONNECTION_STRING);
    }
    throw new Exception(Exception.CANNOT_CONNECT_TO_MONGOOSE);
  }
};

export default connect;
