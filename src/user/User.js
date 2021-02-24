const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: (value) => value.includes("@"),
  },
  password: String,
  avatarURL: String,
  subscription: {
    type: String,
    required: true,
    enum: ["free", "pro", "premium"],
    default: "free",
  },
  token: String,
});

const User = mongoose.model("users", userSchema);
module.exports = User;
