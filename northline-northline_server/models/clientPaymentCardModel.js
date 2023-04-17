const mongoose = require("mongoose");

const paymentCardModel = mongoose.Schema({
  cardNumber: {
    type: String,
    required: [true, "Please enter your card number"],
    trim: true,
    unique: true,
  },
  cardHolderName: {
    type: String,
    required: [true, "Please enter your card holder name"],
    maxLength: 50,
    minLength: 2,
    trim: true,
  },
  expiryDate: {
    type: String,
    required: [true, "Please enter your card expiry date (MM/YY)"],
    maxLength: 5,
    minLength: 5,
    trim: true,
  },
  cvv: {
    type: String,
    required: [true, "Please enter your card cvv"],
    minLength: 3,
    trim: true,
  },

  belongTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Client",
  },
  iv: {
    type: String,
  },
});

module.exports = mongoose.model("ClientPaymentCard", paymentCardModel);
