const mongoose = require("mongoose");
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new mongoose.Schema({
  
  isAdmin: {
    type: Boolean,
    required: "Must specify privileges",
    default: false
  },
  
})

UserSchema.plugin(passportLocalMongoose);
const User = mongoose.model("User", UserSchema);


module.exports = User;