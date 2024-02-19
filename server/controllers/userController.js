import ErrorHandler from "../middlewares/errorMiddleware.js";
import userModel from "../models/userModel.js";

// register controller
export const registerController = async (req, res, next) => {
  try {
    const { name, email, password, phone, role } = req.body;

    // Check if all required fields are present
    if (!(name && email && password && phone && role)) {
      throw new ErrorHandler("Please fill in all the required fields.", 400);
    }

    // Check if the email is already in use
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      throw new ErrorHandler(
        "Email address is already in use. Please use a different email.",
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

    // Save the new user to the database
    await newUser.save();

    const token = await newUser.getJwtToken();
    // Send success response to the client
    res.status(201).json({
      success: true,
      message: `Welcome ${newUser.name}, you have registered successfully!`,
      user: newUser,
      token,
    });
  } catch (error) {
    next(error); // Pass the caught error to the error handling middleware
  }
};

// login controller
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

    // Send success response to the client for user
    if (existingUser.role !== role) {
      throw new ErrorHandler("invalid role, please choose correct role!!", 400);
    }

    return res.status(200).json({
      success: true,
      message: `Welcome ${existingUser.name}, you have logged in successfully as ${existingUser.role}!`,
      user: existingUser,
    });
  } catch (error) {
    next(error);
  }
};
