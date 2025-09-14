import express from "express";
import User from "../models/user.model.js";
import { verifyFirebaseToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// Get all codes for a user
router.get("/codes", verifyFirebaseToken, async (req, res) => {
  try {
    let user = await User.findOne({ uid: req.uid });

    if (!user) {
      user = await User.create({ uid: req.uid, codes: [] });
    }

    res.json(user.codes);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Add ONE new code
router.post("/codes", verifyFirebaseToken, async (req, res) => {
  try {
    const { code } = req.body;

    if (!code || typeof code !== "string") {
      return res.status(400).json({ error: "A valid code string is required" });
    }

    let user = await User.findOne({ uid: req.uid });

    if (!user) {
      user = await User.create({ uid: req.uid, codes: [code] });
    } else {
      user.codes.push(code);
      await user.save();
    }

    res.json(user.codes);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Delete ONE code
router.delete("/codes/:code", verifyFirebaseToken, async (req, res) => {
  try {
    const { code } = req.params;

    let user = await User.findOne({ uid: req.uid });

    if (!user) return res.status(404).json({ error: "User not found" });

    user.codes = user.codes.filter((c) => c !== code);
    await user.save();

    res.json(user.codes);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
