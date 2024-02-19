import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js";

export const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.headers["authorization"];

    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "User Not Authorized" });
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
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};
