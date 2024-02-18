import express from "express";
import dotenv from "dotenv";
import userRoute from "./routes/userRoute.js";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";

// Create an instance of the Express application
const app = express();

// Load environment variables from the configuration file
dotenv.config({ path: "./config/config.env" });

// Define a basic REST API route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "you are at home!!",
  });
});

// Middleware setup

// Enable CORS for connecting client and server
app.use(
  cors({
    origin: [process.env.CLIENT_URL],
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);

// Parse cookies for handling tokens
app.use(cookieParser());

// Parse JSON-encoded bodies for handling JSON data
app.use(express.json());

// Parse URL-encoded bodies for handling form data
app.use(express.urlencoded({ extended: true }));

// Configure file upload middleware
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: "/tmp/"
}));

// Log HTTP requests to the console for debugging
app.use(morgan("dev"));

// Route setup
app.use("/api/user", userRoute);

// Export the configured Express application
export default app;
