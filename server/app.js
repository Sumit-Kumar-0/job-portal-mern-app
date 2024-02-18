import express from "express";
import dotenv from "dotenv";
import userRoute from "./routes/userRoute.js";
import morgan from "morgan";
import cors from "cors"

// app object
const app = express();

// config env
dotenv.config({ path: "./config/config.env" });

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "you are at home!!",
  });
});

// middlewares
app.use(express.json());
app.use(morgan("dev"));
app.use(cors())

// user routing
app.use("/api/user", userRoute);

export default app;
