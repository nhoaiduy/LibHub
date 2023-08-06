import { authService } from "../services/index.js";
import HttpStatusCode from "../core/HttpStatusCode.js";
import Exception from "../core/Exception.js";

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await authService.login({ email, password });

    res.status(HttpStatusCode.OK).json({
      data: user,
    });
  } catch (err) {
    let statusCode = HttpStatusCode.INTERNAL_SERVER_ERROR;
    switch (err.message) {
      case Exception.UNREGISTER_USER:
        statusCode = HttpStatusCode.BAD_REQUEST;
        break;
      case Exception.WRONG_PASSWORD:
        statusCode = HttpStatusCode.BAD_REQUEST;
        break;
      default:
        statusCode = HttpStatusCode.INTERNAL_SERVER_ERROR;
    }
    res.status(statusCode).json({
      message: err.toString(),
    });
  }
};

const register = async (req, res) => {
  const {
    email,
    password,
    fullName,
    birthDate,
    address,
    gender,
    phoneNumber,
    expiryDate,
  } = req.body;
  try {
    let user = await authService.register({
      email,
      password,
      fullName,
      phoneNumber,
      address,
      gender,
      birthDate,
      expiryDate,
    });
    res.status(HttpStatusCode.OK).json({
      message: "Register successfully",
      data: user,
    });
  } catch (err) {
    let statusCode = HttpStatusCode.INTERNAL_SERVER_ERROR;
    if (err.message === Exception.USER_EXIST) {
      statusCode = HttpStatusCode.BAD_REQUEST;
    } else {
      statusCode = HttpStatusCode.INTERNAL_SERVER_ERROR;
    }

    res.status(statusCode).json({
      message: err.toString(),
    });
  }
};

export default { login, register };
