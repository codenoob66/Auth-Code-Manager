import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  uid: {
    type: String,
    required: true,
    index: true,
    unique: true,
  },
  codes: {
    type: [String], // holds exactly 8 backup codes at a time
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("User", UserSchema);

export default User;
