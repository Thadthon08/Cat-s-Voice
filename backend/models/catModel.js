const mongoose = require("mongoose");

const catSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  breed: { type: String, required: true },
  description: { type: String },
  adopted: { type: Boolean, default: false },
});

module.exports = mongoose.model("Cat", catSchema);
