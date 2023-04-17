const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taxiModel = new mongoose.Schema({
  plateNumber: {
    type: String,
    required: true,
  },

  model: {
    type: String,
    required: true,
  },

  productionDate: {
    type: Date,
    required: true,
  },

  taxiType: {
    type: String,
    required: true,
    enum: ["car", "van", "jeep"],
  },

  isBooked: {
    type: Boolean,
    default: false,
  },

  owner: {
    type: Schema.Types.ObjectId,
    ref: "Driver",
  },
});

module.exports = mongoose.model("Taxi", taxiModel);
