const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new mongoose.Schema({
  message: {
    type: String,
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
  },
  driver: {
    type: Schema.Types.ObjectId,
    ref: "Driver",
  },

  reviewOwner: {
    type: Schema.Types.ObjectId,
    ref: "Client",
  },

  ride: {
    type: Schema.Types.ObjectId,
    ref: "TaxiBooking",
  },
});

module.exports = mongoose.model("Review", reviewSchema);
