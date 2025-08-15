import mongoose from "mongoose";

const codeSchema = new mongoose.Schema({
  uid: { type: String, required: true, unique: true },
  codes: [String],
});

const Code = mongoose.model("Code", codeSchema);
export default Code;
