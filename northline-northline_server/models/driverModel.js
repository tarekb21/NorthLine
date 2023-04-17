const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const crypto = require("crypto");

const driverSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      trim: true,
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
      enum: ["taxiDriver", "busDriver"],
    },

    isAvailable: {
      type: Boolean,
      default: true,
    },

    ratings: [
      {
        type: Schema.Types.ObjectId,
        ref: "Review",
      },
    ],

    completedRides: [
      {
        type: Schema.Types.ObjectId,
        ref: "TaxiBooking",
      },
    ],
    discounts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Promo",
      },
    ],

    pendingRides: [
      {
        type: Schema.Types.ObjectId,
        ref: "TaxiBooking",
      },
    ],

    totalEarnings: {
      type: Number,
      default: 0,
    },

    paymentCards: [
      {
        type: Schema.Types.ObjectId,
        ref: "PaymentCard",
      },
    ],
    notifications: [
      {
        type: Schema.Types.ObjectId,
        ref: "Notification",
      },
    ],
    archivedNotifications: [
      {
        type: Schema.Types.ObjectId,
        ref: "Notification",
      },
    ],
    followers: [
      {
        type: Schema.Types.ObjectId,
        ref: "Client",
      },
    ],
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
  },
  {
    timestamps: true,
  }
);

driverSchema.pre("save", function (next) {
  if (!this.isModified("password") || this.isNew) {
    return next();
  }

  this.passwordChangedAt = Date.now() - 1000;
  next();
});

driverSchema.methods.passwordChangedAfterTokenIssued = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const passwordChangeTime = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    return passwordChangeTime > JWTTimestamp;
  }
  return false;
};

driverSchema.methods.generatePasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};
module.exports = mongoose.model("Driver", driverSchema);
