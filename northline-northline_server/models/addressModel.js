const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  city: {
    type: String,
    required: true,
    maxLength: 255,
  },
  street: {
    type: String,
    required: true,
    maxLength: 255,
  },
  state: {
    type: String,
    required: true,
    maxLength: 255,
  },
  country: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Address", addressSchema);
