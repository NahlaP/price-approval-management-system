import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: {
    type: String,
    enum: ["executive", "manager", "admin"],
    default: "executive",
  },
});

export default mongoose.model("User", userSchema);