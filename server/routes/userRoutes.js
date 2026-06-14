import express from "express";
import { getUserProfile, createUser } from "../controllers/userController.js";

const router = express.Router();

router.post("/user/create", createUser);
router.get("/user/:id", getUserProfile);

export default router;