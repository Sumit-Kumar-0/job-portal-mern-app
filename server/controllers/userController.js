import { sendToken } from "../helpers/jwtToken.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";
import userModel from "../models/userModel.js";

// Register controller
export const registerController = async (req, res, next) => {
  try {
    const { name, email, password, phone, role } = req.body;

    // Check if all required fields are present
    if (!(name && email && password && phone && role)) {
      throw new ErrorHandler("Please fill in all the required fields.", 400);
    }

    // Check if the email is already in use
    const existingUser = await userModel.findOne({ email });
    const existingUserByPhone = await userModel.findOne({ phone });

    if (existingUser && existingUserByPhone && existingUser.role === role) {
      throw new ErrorHandler("You are already registered please login!!.", 400);
    }

    if (existingUser && existingUser.phone === phone) {
      throw new ErrorHandler(
        "you are already registerd with this email and phone, please choose another!!",
        400
      );
    }

    if (existingUser) {
      throw new ErrorHandler(
        "you are already registerd with this email, please choose another!!",
        400
      );
    }

    if (existingUserByPhone) {
      throw new ErrorHandler(
        "you are already registerd with this phone, please choose another!!",
        400
      );
    }

    // Create a new user instance
    const newUser = new userModel({
      name,
      email,
      password,
      phone,
      role,
    });
    await newUser.save();

    // Send success response to the client
    sendToken(
      newUser,
      201,
      res,
      `Welcome ${newUser.name}, you have registered successfully!`
    );
  } catch (error) {
    next(error); // Pass the caught error to the error handling middleware
  }
};

// Login controller
export const loginController = async (req, res, next) => {
  try {
    const { email, password, role } = req.body;

    // Check if all required fields are present
    if (!(email && password && role)) {
      throw new ErrorHandler("Please fill all input fields.", 400);
    }

    // Check if the email is already in use
    const existingUser = await userModel.findOne({ email });
    if (!existingUser) {
      throw new ErrorHandler(
        "User does not exist. Please register first.",
        400
      );
    }

    // Ensure the user's role matches the provided role
    if (existingUser.role !== role) {
      throw new ErrorHandler("Invalid role, please choose correct role!!", 400);
    }

    // Verify the user's password
    const isValidPassword = await existingUser.comparePassword(password);
    if (!isValidPassword) {
      throw new ErrorHandler(
        "Invalid password, please choose correct password!!",
        400
      );
    }

    sendToken(
      existingUser,
      200,
      res,
      `Welcome ${existingUser.name}, you have logged in successfully as ${existingUser.role}!`
    );
  } catch (error) {
    next(error);
  }
};

// Logout controller
export const logoutController = async (req, res, next) => {
  try {
    res.clearCookie("token").status(201).json({
      success: true,
      message: "You are Logged Out Successfully!!",
    });
  } catch (error) {
    next(error);
  }
};
