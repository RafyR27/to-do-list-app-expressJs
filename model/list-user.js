const mongoose = require("mongoose");

const listUser = mongoose.model("listUser", {
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  emoji: {
    type: String,
  },  
  createAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = listUser;