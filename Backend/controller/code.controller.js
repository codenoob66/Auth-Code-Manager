import User from "../models/user.model.js";
import mongoose from "mongoose";

export const getCodebyUid = async (req, res) => {
  try {
  } catch (error) {
    console.error("Error fetching code by UID:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
