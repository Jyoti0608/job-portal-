import dotenv from "dotenv";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import connect from "./db/connect.js";
import fs from "fs";
import { fileURLToPath } from "url";
import path from "path";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// CORS
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Test Route
app.get("/", (req, res) => {
  res.send("JobStart API is running...");
});

// Auto Import Routes
const routesPath = path.join(__dirname, "routes");
const routeFiles = fs.readdirSync(routesPath);

routeFiles.forEach((file) => {
  import(path.join(routesPath, file))
    .then((route) => {
      app.use("/api/v1/", route.default);
      console.log(`Route loaded: ${file}`);
    })
    .catch((error) => {
      console.log("Error importing route", error);
    });
});

// Start Server
const server = async () => {
  try {
    await connect();
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  } catch (error) {
    console.log("Server error", error.message);
    process.exit(1);
  }
};

server();