import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  uid: {
    type: String,
    required: true,
    index: true,
    unique: true, // ensures one doc per Firebase user
  },
  codes: {
    type: [String], // array of strings for multiple codes
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Use "User" (or "BackupCode") as the collection name
const User = mongoose.model("User", UserSchema);

export default User;
