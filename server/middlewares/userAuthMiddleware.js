import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js";
import ErrorHandler from "./errorMiddleware.js";

export const isAuthenticated = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "User Not Authorized!!" });
    }

    const decoded = JWT.verify(token, process.env.JWT_SECRET_KEY);
    const user = await userModel.findById(decoded.id);

    if (!user || user.role !== decoded.role) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid token or role" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    next(new ErrorHandler("authentication error! invalid token!!", 500));
  }
};
