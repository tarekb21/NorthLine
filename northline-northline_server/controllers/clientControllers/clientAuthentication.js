const Client = require("../../models/clientModel");
const tokenCreator = require("./tokenCreatorController");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require("validator");
const { promisify } = require("util");

const checkPassword = async (candidatePassword, userPassword) => {
  return await bcrypt.compare(candidatePassword, userPassword);
};

exports.clientSignup = async (req, res) => {
  try {
    const client = await Client.findOne({
      $or: [{ email: req.body.email }, { phoneNumber: req.body.phoneNumber }],
    });

    if (client) {
      return res.status(409).json({
        message: "The client with the provided details already exist",
      });
    }

    if (!validator.isEmail(req.body.email)) {
      return res
        .status(400)
        .json({ message: "Please enter a valid email address" });
    }

    if (req.body.password !== req.body.passwordConfirm) {
      return res.status(400).json({ message: "Passwords does not match" });
    }

    const salt = await bcrypt.genSalt(12);
    let hashedPassword = await bcrypt.hash(req.body.password, salt);

    const newClient = await Client.create({
      fullname: req.body.fullname,
      email: req.body.email,
      password: hashedPassword,
      phoneNumber: req.body.phoneNumber,
      gender: req.body.gender,
      age: req.body.age,
    });

    tokenCreator.createSendToken(newClient, 201, req, res, "");
  } catch (err) {
    console.log(err);
  }
};

exports.clientLogin = async (req, res) => {
  try {
    const { email, phoneNumber, password } = req.body;

    if (!validator.isEmail(email)) {
      return res.status(400).json({
        message: "Please provide a valid email address",
      });
    }
    const client = await Client.findOne({
      $or: [{ email: email }, { phoneNumber: phoneNumber }],
    });

    if (!client) {
      return res.status(404).json({
        message: "The client with the provided details does not exist",
      });
    }
    if (!(await checkPassword(password, client.password))) {
      return res.status(401).json({ message: "Incorrect credentials" });
    }

    tokenCreator.createSendToken(client, 200, req, res, "");
  } catch (err) {
    console.log(err);
  }
};

exports.protect = async (req, res, next) => {
  try {
    // 1) check if the client token exist
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
    const currentClient = await Client.findById(decoded.id);

    if (!currentClient) {
      return res.status(401).json({
        message: "The client belonging to this token does no longer exist.",
      });
    }

    // Add the valid logged in user to other requests
    req.client = currentClient;
    next();
  } catch (err) {
    console.log(err);
  }
};

exports.updateClientPassword = async (req, res) => {
  try {
    const client = await Client.findById(req.client._id);

    if (!(await checkPassword(req.body.oldPassword, client.password))) {
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

    client.password = hashedPassword;

    await client.save();
    tokenCreator.createSendToken(client, 200, req, res, "");
  } catch (err) {
    console.log(err);
  }
};
