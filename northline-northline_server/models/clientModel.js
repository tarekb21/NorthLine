const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const crypto = require("crypto");

const clientSchema = new mongoose.Schema({
  fullname: {
    type: String,
    trim: true,
  },

  photo: {
    type: String,
    default: "",
  },

  phoneNumber: {
    type: String,
    trim: true,
  },

  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
  },

  password: {
    type: String,
    trim: true,
    minLength: 8,
  },

  address: {
    type: String,
  },

  age: {
    type: Number,
  },

  gender: {
    type: String,

    enum: ["male", "female", "other"],
  },

  type: {
    type: String,
    default: "individual",
    enum: ["individual", "company"],
  },

  scheduledRides: [
    {
      type: Schema.Types.ObjectId,
      ref: "TaxiBooking",
    },
  ],

  completedRides: [
    {
      type: Schema.Types.ObjectId,
      ref: "TaxiBooking",
    },
  ],

  cancelledRides: [
    {
      type: Schema.Types.ObjectId,
      ref: "TaxiBooking",
    },
  ],

  usedPromoCodes: [
    {
      type: Schema.Types.ObjectId,
      ref: "Promo",
    },
  ],

  totalSpending: {
    type: Number,
    default: 0,
  },

  following: [
    {
      type: Schema.Types.ObjectId,
      ref: "Driver",
    },
  ],
  paymentCards: [
    {
      type: Schema.Types.ObjectId,
      ref: "ClientPaymentCard",
    },
  ],
});

clientSchema.pre("save", function (next) {
  if (!this.isModified("password") || this.isNew) {
    return next();
  }

  this.passwordChangedAt = Date.now() - 1000;
  next();
});

clientSchema.methods.passwordChangedAfterTokenIssued = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const passwordChangeTime = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    return passwordChangeTime > JWTTimestamp;
  }
  return false;
};

clientSchema.methods.generatePasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

module.exports = mongoose.model("Client", clientSchema);
