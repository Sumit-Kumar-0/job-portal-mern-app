import {
  registerController,
  loginController,
} from "../controllers/userController.js";
import express from "express";

const userRoute = express.Router();

// register
userRoute.post("/register", registerController);

// login
userRoute.post("/login", loginController);

export default userRoute;
