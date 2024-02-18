import {
  registerController,
  loginController,
} from "../controllers/userController.js";
import express from "express";

const router = express.Router();

// register
router.post("/register", registerController);

// login
router.post("/login", loginController);

export default router;
