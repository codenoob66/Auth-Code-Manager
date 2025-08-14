import User from "../models/User.js";

// Replace codes with new ones
export const saveCodes = async (req, res) => {
  const { codes } = req.body; // expect array of 8 codes

  try {
    const updated = await User.findOneAndUpdate(
      { uid: req.user.uid },
      { uid: req.user.uid, codes },
      { upsert: true, new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Fetch current codes
export const getCodes = async (req, res) => {
  try {
    const userCodes = await User.findOne({ uid: req.user.uid });
    res.json(userCodes || { codes: [] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
