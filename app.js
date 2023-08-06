import express from "express";
import * as dotenv from "dotenv";
import { authentication } from "./middleware/middleware.js";
import { OutputType, print } from "./utils/helpers/print.js";
import { authRouter } from "./routers/index.js";
import connect from "./data/data.js";

dotenv.config();
const PORT = process.env.PORT || 3500;

const app = express();
app.use(authentication);
app.use(express.json());

app.use("/auth", authRouter);

app.listen(PORT, async () => {
  try {
    await connect();
  } catch (err) {
    print(err, OutputType.E);
  }
  print(`Listen on port: http://localhost:${PORT}`, OutputType.I);
});
