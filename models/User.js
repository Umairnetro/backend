const mongoose = require("mongoose");

const Schema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      minlenght: 3,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", Schema);

module.exports = User;
