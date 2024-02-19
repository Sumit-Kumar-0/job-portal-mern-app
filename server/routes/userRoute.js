import {
  registerController,
  loginController,
} from "../controllers/userController.js";
import express from "express";
import { isAuthenticated } from "../middlewares/userAuthMiddleware.js";

const router = express.Router();

// register
router.post("/register", registerController);

// login
router.post("/login", isAuthenticated, loginController);

export default router;
