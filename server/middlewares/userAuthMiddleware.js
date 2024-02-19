import JWT from "jsonwebtoken"
import userModel from '../models/userModel.js';
export const isAuthenticated = async (req, res, next) => {
//   const { token } = req.cookies;
  const token = req.headers['authorization'];
  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "User Not Authorized" });
    }
    try {
        const decoded = JWT.verify(token, process.env.JWT_SECRET_KEY);
        console.log(decoded.id);
        const user = await userModel.findById(decoded.id);
        console.log(user);
    next();
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};
