import jwt from "jsonwebtoken";
import HttpStatusCode from "../core/HttpStatusCode.js";

const checkToken = async (req, res, next) => {
  const url = req.url.toLowerCase().trim();
  if (
    url === "/auth/login" ||
    url === "/auth/register" ||
    url === "/auth/forgot"
  ) {
    next();
    return;
  }

  const token = req.header?.authorization?.split[" "][1];

  try {
    const jwtObject = jwt.verify(token, process.env.JWT_KEY);
    const isExpired = Date.now() >= jwtObject.exp * 1000;
    if (!isExpired) {
      res
        .status(HttpStatusCode.UNAUTHORIZED)
        .json({ message: "Please login to execute this request" });
      next();
    }
  } catch (err) {
    res
      .status(HttpStatusCode.UNAUTHORIZED)
      .json({ message: "Please login to execute this request" });
  }
};

export default checkToken;
