import express from "express";
import Code from "../models/code.js";

const router = express.Router();

// GET user codes
router.get("/:uid", async (req, res) => {
  try {
    const codes = await Code.findOne({ uid: req.params.uid });
    if (!codes) return res.json({ codes: [] });
    res.json(codes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST save/update user codes
router.post("/:uid", async (req, res) => {
  try {
    const { codes } = req.body;
    const updated = await Code.findOneAndUpdate(
      { uid: req.params.uid },
      { codes },
      { new: true, upsert: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
