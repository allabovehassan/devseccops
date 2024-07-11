const { Schema, model } = require("mongoose");

const counterSchema = Schema(
  {
    count: {
      type: Number,
      required: true,
      default: 0
    }
  },
  {
    versionKey: false
  }
);

const Counter = model("RegisteredUser", counterSchema);

module.exports = { Counter };
