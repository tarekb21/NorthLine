const mongoose = require("mongoose");

const notificationModel = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    maxLength: 255,
  },
  message: {
    type: String,
    required: true,
    maxLength: 500,
  },
  notificationType: {
    type: String,
    required: true,
    enum: ["ridecompletion", "ridecancellation"],
  },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Driver",
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Client",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  seen: {
    type: Boolean,
    default: false,
  },
  archived: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Notification", notificationModel);
