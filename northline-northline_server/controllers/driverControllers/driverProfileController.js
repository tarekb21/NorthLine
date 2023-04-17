const driverModel = require("../../models/driverModel");
const validator = require("validator");

exports.updateDriverProfile = async (req, res) => {
  try {
    const driver = await driverModel.findById(req.driver.id);

    if (!driver) {
      return res.status(404).json({
        message: "Driver not found",
      });
    }
    const fullname = req.body.fullname;
    const email = req.body.email;
    const phoneNumber = req.body.phoneNumber;
    const address = req.body.address;

    if (
      fullname === "" ||
      email === "" ||
      phoneNumber === "" ||
      address === ""
    ) {
      return res.status(400).json({
        message: "Please provide all the required fields",
      });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({
        message: "Please provide a valid email address",
      });
    }

    if (
      (email || phoneNumber) &&
      email !== driver.email &&
      phoneNumber !== driver.phoneNumber
    ) {
      const driverExists = await driverModel.findOne({
        $or: [{ email }, { phoneNumber }],
      });

      if (driverExists) {
        return res.status(400).json({
          message: "Driver with the same email or phone number already exists",
        });
      }
    }
    driver.fullname = fullname;
    driver.email = email;
    driver.phoneNumber = phoneNumber;
    driver.address = address;

    await driver.save();

    return res.status(200).json({ updatedDriver: driver });
  } catch (err) {
    console.log(err);
  }
};

exports.getUserProfileDetails = async (req, res) => {
  try {
    const driver = await driverModel.findById(req.driver.id);

    if (!driver) {
      return res.status(404).json({
        message: "Driver not found",
      });
    }

    const { fullname, email, phoneNumber, address } = driver;

    return res.status(200).json({
      profileInfo: {
        fullname,
        email,
        phoneNumber,
        address,
      },
    });
  } catch (err) {
    console.log(err);
  }
};
