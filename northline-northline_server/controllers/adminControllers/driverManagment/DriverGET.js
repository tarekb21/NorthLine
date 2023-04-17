const Driver = require("../../../models/driverModel");

exports.getAllDrivers = async (req, res) => {
  try {
    const drivers = await Driver.find();

    if (drivers.length > 0) {
      return res.status(200).json({
        message: "NorthLine Drivers are: ",
        data: drivers,
      });
    }

    return res.status(404).json({
      message: "No Drivers found",
    });
  } catch (err) {
    console.log(err);
  }
};

exports.getDriver = async (req, res) => {
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
  } catch (err) {
    console.log(err);
  }
};

exports.getAllAvailableDrivers = async (req, res) => {
  try {
    const availableDrivers = await Driver.find({ $eq: { isAvailable: true } });

    if (availableDrivers.length == 0) {
      res.status(409).json({
        message: "There is no available drivers at the moment",
      });
    }

    return res.status(200).json({
      message: "Available Drivers are: ",
      data: availableDrivers,
    });
  } catch (err) {
    console.log(err);
  }
};
