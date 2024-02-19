import JWT from "jsonwebtoken";
import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "please provide your name"],
      minLength: [2, "name must contain at least 2 characters"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "please provide your email"],
      validate: [validator.isEmail, "this email is already exist"],
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "please provide your password"],
      trim: true,
      minLength: [6, "password must contain at least 6 characters"],
      maxLength: [30, "password must contain at most 30 characters"],
    },
    phone: {
      type: String,
      required: [true, "please provide your phone number"],
      trim: true,
    },
    role: {
      type: String,
      required: [true, "please provide your role"],
      enum: ["user", "admin"],
      trim: true,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  try {
    this.password = await bcrypt.hash(this.password, 10);
    return next();
  } catch (error) {
    return next(error);
  }
});

userSchema.methods.comparePassword = async function (enteredPassword) {
  const passwordMatched = await bcrypt.compare(
    enteredPassword,
    this.password
  );
  if (!passwordMatched) {
    throw new Error("Invalid password");
  }
  return passwordMatched;
};

userSchema.methods.getJwtToken = function () {
  const token = JWT.sign(
    { id: this._id, role: this.role },
    process.env.JWT_SECRET_KEY,
    { expiresIn: process.env.JWT_EXPIRES }
  );
  return token;
};

const userModel = mongoose.model("user", userSchema);
export default userModel;
