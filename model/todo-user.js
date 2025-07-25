const mongoose = require("mongoose");

const todoUser = mongoose.model("todoUser", {
  todoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  todoList: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "listUser",
    required: true,
  },
  emojiRef: {
    type: String,
    required: true,
  },
  todo: {
    type: String,
    required: true,
  },
  timeStart: {
    type: String,
    required: true,
  },
  timeEnd: {
    type: String,
    required: true,
  },
  dateStart: {
    type: String,
    required: true,
  },
  complete: {
    type: Boolean,
    default: false,
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = todoUser;