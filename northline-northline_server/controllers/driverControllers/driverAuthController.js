const Driver = require("../../models/driverModel");
const driverHelper = require("./helperController");
const tokenCreator = require("./tokenCreatorController");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const validator = require("validator");

exports.driverSignup = async (req, res) => {
  try {
    const driver = await Driver.findOne({
      $or: [{ email: req.body.email }, { phoneNumber: req.body.phoneNumber }],
    });

    if (driver) {
      return res.status(409).json({
        message: "The Driver with the provided details already exist",
      });
    }

    if (!validator.isEmail(req.body.email)) {
      return res.status(400).json({
        message: "Please provide a valid email address",
      });
    }

    const salt = await bcrypt.genSalt(12);
    let hashedPassword = await bcrypt.hash(req.body.password, salt);
    const newDriver = await Driver.create({
      email: req.body.email,
      password: hashedPassword,
      fullname: req.body.fullname,
      gender: req.body.gender,
      age: req.body.age,
      phoneNumber: req.body.phoneNumber,
      address: req.body.address,
      type: req.body.type,
    });

    let msg = "Your account has been created successfully";
    tokenCreator.createSendToken(newDriver, 201, req, res, msg);
  } catch (err) {
    console.log(err);
    driverHelper.mongooseErrorHandler(err, res);
  }
};

exports.driverLogin = async (req, res) => {
  try {
    const { email, phoneNumber, password } = req.body;

    if (!validator.isEmail(email)) {
      return res.status(400).json({
        message: "Please provide a valid email address",
      });
    }
    const driver = await Driver.findOne({
      $or: [{ email: email }, { phoneNumber: phoneNumber }],
    });

    if (!driver) {
      return res.status(404).json({
        message: "The Driver with the provided details does not exist",
      });
    }
    if (!(await driverHelper.checkPassword(password, driver.password))) {
      return res.status(401).json({ message: "Incorrect credentials" });
    }

    tokenCreator.createSendToken(driver, 200, req, res, "");
  } catch (err) {
    console.log(err);
    driverHelper.mongooseErrorHandler(err, res);
  }
};

exports.protect = async (req, res, next) => {
  try {
    // 1) check if the driver token exist
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({
        message: "You are not logged in - Please log in to get access",
      });
    }

    // 2) token verification
    let decoded;
    try {
      decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    } catch (error) {
      if (error.name === "JsonWebTokenError") {
        console.log(error.message);
        return res
          .status(401)
          .json({ message: "Invalid token. Please log in" });
      } else if (error.name === "TokenExpiredError") {
        return res.status(401).json({
          message: "Your session token has expired !! Please login again",
        });
      }
    }

    // 3) check if user still exists
    const currentDriver = await Driver.findById(decoded.id);

    if (!currentDriver) {
      return res.status(401).json({
        message: "The driver belonging to this token does no longer exist.",
      });
    }

    // 4) check if the user changed the password after the token was created
    if (currentDriver.passwordChangedAfterTokenIssued(decoded.iat)) {
      return res.status(401).json({
        message: " Your password has been changed recently. Please login again",
      });
    }

    // Add the valid logged in user to other requests
    req.driver = currentDriver;
    next();
  } catch (err) {
    console.log(err);
  }
};

exports.updateDriverPassword = async (req, res) => {
  try {
    const driver = await Driver.findById(req.driver._id);

    if (
      !(await driverHelper.checkPassword(req.body.oldPassword, driver.password))
    ) {
      return res.status(400).json({
        message: "Your current password is incorrect",
      });
    }

    if (req.body.newPassword !== req.body.confirmPassword) {
      return res.status(400).json({
        message: "Your new password and confirm password do not match",
      });
    }

    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(req.body.newPassword, salt);

    driver.password = hashedPassword;

    await driver.save();
    tokenCreator.createSendToken(driver, 200, req, res, "");
  } catch (err) {
    console.log(err);
  }
};
