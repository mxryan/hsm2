const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    trim: true,
    required: "Username is Required"
  },
  isAdmin: {
    type: Boolean,
    required: "Must specify privileges",
    default: false
  },
  password: {
    type: String,
    required: "Password is required"
  }
})

const User = mongoose.model("User", UserSchema);

module.exports = User;