import {
  registerController,
  loginController,
  logoutController,
} from "../controllers/userController.js";
import express from "express";
import { isAuthenticated } from "../middlewares/userAuthMiddleware.js";

const router = express.Router();

// register
router.post("/register", registerController);

// login
router.post("/login", loginController);

// logout
router.get("/logout", isAuthenticated, logoutController);

export default router;
