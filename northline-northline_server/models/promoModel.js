const mongoose = require("mongoose");

const promoSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Diver",
  },
  code: {
    type: String,
  },
  discountValue: {
    type: mongoose.Schema.Types.Decimal128,
  },
  startDate: {
    type: Number,
  },
  endDate: {
    type: Number,
  },
  expiryHour: {
    type: Number,
  },
  isActive: {
    type: String,
    default: "true",
    enum: ["true", "false"],
  },
  limit: {
    type: Number,
  },
});

module.exports = mongoose.model("Promo", promoSchema);
