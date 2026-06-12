import asyncHandler from "express-async-handler";
import User from "../models/UserModel.js";
import mongoose from "mongoose";

export const getUserProfile = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    let user;

    // If MongoDB ObjectId
    if (mongoose.Types.ObjectId.isValid(id)) {
      user = await User.findById(id);
    } else {
      // Otherwise treat as Auth0 ID
      user = await User.findOne({ auth0Id: id });
    }

    if (!user) {
      return res.status(404).json({
        message: "User Not Found",
      });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.log("Error in getUserProfile:", error);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
});