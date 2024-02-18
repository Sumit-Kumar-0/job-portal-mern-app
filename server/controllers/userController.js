import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";

// register controller
export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, role } = req.body;

    // Check if all required fields are present
    if (!(name && email && password && phone && role)) {
      return res.status(400).json({
        success: false,
        message: "Please fill in all the required fields.",
      });
    }

    // Check if the email is already in use
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message:
          "Email address is already in use. Please use a different email.",
      });
    }

    let saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPassword = bcrypt.hashSync(password, salt);

    // Create a new user instance
    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
      phone,
      role,
    });

    // Save the new user to the database
    await newUser.save();

    // Send success response to the client
    res.status(201).json({
      success: true,
      message: `Welcome ${newUser.name}, you have registered successfully!`,
      user: newUser,
    });
  } catch (error) {
    // Log the error on the server side
    console.error("Error during user registration:", error);

    // Send generic error message to the client
    res.status(500).json({
      success: false,
      message:
        "Internal server error during registration. Please try again later.",
    });
  }
};

// login controller
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if all required fields are present
    if (!(email && password)) {
      return res.status(400).json({
        success: false,
        message: "Please fill both input fields.",
      });
    }

    // Check if the email is already in use
    const existingUser = await userModel.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({
        success: false,
        message: "user not exist please register first!!.",
      });
    }

    const comparePassword = bcrypt.compareSync(password, existingUser.password);
    if (!comparePassword) {
      return res.status(400).json({
        success: false,
        message: "invalid password",
      });
    }
    if (!(email === existingUser.email)) {
      return res.status(400).json({
        success: false,
        message: "invalid password",
      });
    }

    // Send success response to the client for user
    if (existingUser.role === "user") {
      return res.status(200).json({
        success: true,
        message: `Welcome ${existingUser.name}, you have login successfully as user!`,
        user: existingUser,
      });
    }
    // Send success response to the client for user
    if (existingUser.role === "admin") {
      return res.status(200).json({
        success: true,
        message: `Welcome ${existingUser.name}, you have login successfully as admin!`,
        user: existingUser,
      });
    }
  } catch (error) {
    // Log the error on the server side
    console.error("Error during user login:", error);

    // Send generic error message to the client
    res.status(500).json({
      success: false,
      message: "Internal server error during login. Please try again later.",
    });
  }
};
