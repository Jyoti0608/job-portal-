import asyncHandler from "express-async-handler";
import User from "../models/UserModel.js";
import mongoose from "mongoose";

// Get or create user after Auth0 login
export const createUser = asyncHandler(async (req, res) => {
  try {
    const { auth0Id, name, email, profilePicture } = req.body;

    let user = await User.findOne({ auth0Id });

    if (!user) {
      user = await User.create({ auth0Id, name, email, profilePicture });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.log("Error in createUser:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

export const getUserProfile = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    let user;

    if (mongoose.Types.ObjectId.isValid(id)) {
      user = await User.findById(id);
    } else {
      user = await User.findOne({ auth0Id: id });
    }

    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.log("Error in getUserProfile:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});