const Driver = require("../../../models/driverModel");
const bcrypt = require("bcrypt");
const validator = require("validator");

exports.driverUpdate = async (req, res) => {
  try {
    const driver = await Driver.findOne({
      $or: [
        { _id: req.body.driverID },
        { phoneNumber: req.body.phoneNumber },
        { email: req.body.email },
      ],
    });

    if (!driver) {
      return res.status(404).json({
        message: "Driver with the provided details does not exist.",
      });
    }

    if (!validator.isEmail(req.body.email)) {
      return res.status(400).json({
        message: "Please provide a valid email address",
      });
    }

    const salt = await bcrypt.genSalt(12);
    let hashedPassword;

    if (req.body.password) {
      hashedPassword = await bcrypt.hash(req.body.password, salt);
    }

    const checkEmailPhone = await Driver.findOne({
      $or: [{ email: req.body.email }, { phoneNumber: req.body.phoneNumber }],
    });
    if (checkEmailPhone) {
      return res.status(409).json({
        message: "The email/PhoneNumber you are trying to use already exists",
      });
    }
    driver.fullname = req.body.fullname;
    driver.email = req.body.email;
    driver.phoneNumber = req.body.phoneNumber;
    driver.password = hashedPassword;
    driver.address = req.body.address;
    driver.age = req.body.age;
    driver.type = req.body.type;

    await driver.save();

    return res.status(200).json({
      message: "Driver updated successfully",
      data: driver,
    });
  } catch (err) {
    console.log(err);
  }
};
