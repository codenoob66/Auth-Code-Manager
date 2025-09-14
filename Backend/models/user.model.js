import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  uid: {
    type: String,
    required: true,
    unique: true, // each Firebase user only once
  },
  codes: {
    type: [String],
    default: [], // user starts with no codes
  },
});

const User = mongoose.model("User", userSchema);

export default User;
