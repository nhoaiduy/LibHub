import express from "express";
import { authController } from "./../controllers/index.js";

const router = express.Router();

router.post("/login", authController.login);

router.post("/register", authController.register);

router.post("/reset", async (req, res) => {});

export default router;
