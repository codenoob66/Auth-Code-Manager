import mongoose from "mongoose";
import User from "../models/user.model.js";

export const getUser = async (req, res) => {
  try {
    const user = await User.find({});
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    console.error("error in fetching users:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
