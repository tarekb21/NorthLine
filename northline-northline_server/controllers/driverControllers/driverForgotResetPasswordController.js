const Driver = require("../../models/driverModel");
const tokenCreator = require("./tokenCreatorController");
const crypto = require("crypto");
const email = require("../../utils/emailTransporter");
const bcrypt = require("bcrypt");

exports.sendForgotPasswordRequest = async (req, res) => {
  try {
    const driver = await Driver.findOne({ email: req.body.email });

    if (!driver) {
      return res.status(404).json({
        message: "The Driver with the provided email, does not exist !!",
      });
    }
    const resetToken = driver.generatePasswordResetToken();
    await driver.save({ validateBeforeSave: false });

    const url = `${req.protocol}://${req.get(
      "host"
    )}/api/v1/drivers/requests/resetPassword/${resetToken}`;
    const msg = `Forgot your Password ? Reset it by visting the following link: ${url}`;

    try {
      await email.sendMail({
        email: driver.email,
        subject: "Your Password Reset Token (valid for 10 min)",
        message: msg,
      });
      res.status(200).json({
        status: "success",
        message:
          " The Reset token was successfully sent to your email address.",
      });
    } catch (err) {
      driver.passwordResetToken = undefined;
      driver.passwordResetExpires = undefined;
      await driver.save({ validateBeforeSave: false });

      res.status(500).json({
        status: "success",
        message:
          " An error occurred while sending the email. Please try again in a moment",
      });
    }
  } catch (err) {
    console.log(err);
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const hashtoken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");

    const driver = await Driver.findOne({
      passwordResetToken: hashtoken,
      passwordResetExpires: { $gt: Date.now() },
    });

    if (!driver) {
      return res.status(400).json({
        message:
          " The token is invalid or expired. Please submit another request",
      });
    }

    if (req.body.password.length < 8) {
      return res.status(400).json({
        message: "Password length must be at least 8 characters",
      });
    }

    if (req.body.password !== req.body.passwordConfirm) {
      return res.status(400).json({
        message:
          "Password and Password Confirm does not match. Please make sure to enter them correctly.",
      });
    }
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    driver.password = hashedPassword;
    driver.passwordResetToken = undefined;
    driver.passwordResetExpires = undefined;

    await driver.save();
    tokenCreator.createSendToken(driver, 200, req, res, "");
  } catch (err) {
    console.log(err);
  }
};
