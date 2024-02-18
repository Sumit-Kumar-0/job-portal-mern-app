import express from "express";
import dotenv from "dotenv";

// app object 
const app = express()

// config env 
dotenv.config({path: "./config/config.env"})

export default app;