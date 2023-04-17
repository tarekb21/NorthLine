const Driver = require("../../../models/driverModel");

exports.deleteAllDrivers = async (req, res) => {
  try {
    const driversToBeDeleted = await Driver.deleteMany({});
    if (driversToBeDeleted.deletedCount > 0) {
      res.status(200).json({
        message: "All drivers are deleted successfully",
      });
    }

    return res.status(404).json({
      message: "There is no drivers to delete them",
    });
  } catch (err) {
    console.log(err);
  }
};

exports.deleteDriver = async (req, res) => {
  try {
    const driver = await Driver.findOneAndRemove({
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

    res.status(200).json({
      message: "Driver is deleted successfully",
    });
  } catch (err) {
    console.log(err);
  }
};
