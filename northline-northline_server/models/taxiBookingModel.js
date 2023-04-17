const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taxiBookingSchema = new mongoose.Schema({
  client: {
    type: Schema.Types.ObjectId,
    ref: "Client",
  },

  driver: {
    type: Schema.Types.ObjectId,
    ref: "Driver",
  },

  rideFees: {
    type: Number,
  },
  estimatedDepartureTime: {
    type: String,
  },

  estimatedArrivalTime: {
    type: String,
  },

  departureLocation: {
    type: String,
  },

  destinationLocation: {
    type: String,
  },
  status: {
    type: String,
    default: "pending",
    enum: ["pending", "accepted", "completed", "cancelled", "rejected"],
  },
});

module.exports = mongoose.model("TaxiBooking", taxiBookingSchema);
