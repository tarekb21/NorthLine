const Driver = require("../../models/driverModel");

exports.changeAvailabilityStatus = async (req, res) => {
  try {
    const driver = await Driver.findById(req.driver._id);
    if (!driver) {
      return res
        .status(404)
        .json({ message: "The Driver does not exist in the system" });
    }

    if (driver.isAvailable === true) {
      driver.isAvailable = false;
      await driver.save();
      return res.status(200).json({ message: "Driver is now unavailable." });
    } else {
      driver.isAvailable = true;
      await driver.save();
      return res.status(200).json({ message: "Driver is now available. " });
    }
  } catch (err) {
    console.log(err);
  }
};

exports.automaticAvailabilityStatusChanger = async (req, res) => {
  try {
    const driver = await Driver.findById(req.driver._id);

    if (!driver) {
      return res.status(404).json({ message: "Driver is not found" });
    }

    if (driver.pendingRides.length > 0) {
      driver.isAvailable = false;
      await driver.save();
      return res.status(200).json({
        message:
          "The Driver is not available, right now!!. They have one or more pending ride to complete",
      });
    }
    driver.isAvailable = true;
    await driver.save();
    return res
      .status(200)
      .json({
        message:
          "The Driver is available. And ready to receive new rides requests",
      });
  } catch (err) {
    console.log(err);
  }
};
