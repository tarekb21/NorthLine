const Driver = require("../../models/driverModel");
const TaxiBooking = require("../../models/taxiBookingModel");

exports.countCompletedBookings = async (req, res) => {
  try {
    const driver = await Driver.findById(req.driver.id);
    if (!driver) {
      return res.status(404).json({
        message: "Driver not found",
      });
    }
    const completedBookings = await TaxiBooking.find({
      driver: driver._id,
      status: "completed",
    }).countDocuments();
    res.status(200).json({
      status: "success",
      data: {
        completedBookings,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

exports.computeEarnings = async (req, res) => {
  try {
    const driver = await Driver.findById(req.driver.id);
    if (!driver) {
      return res.status(404).json({
        message: "Driver not found",
      });
    }
    const completedBookings = await TaxiBooking.find({
      driver: driver._id,
      status: "completed",
    });
    let earnings = 0;
    completedBookings.forEach((booking) => {
      earnings += booking.rideFees;
    });
    res.status(200).json({
      status: "success",
      data: {
        earnings,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

exports.listCompletedRides = async (req, res) => {
  try {
    const driver = await Driver.findById(req.driver.id);
    if (!driver) {
      return res.status(404).json({
        message: "Driver not found",
      });
    }
    const completedBookings = await TaxiBooking.find({
      driver: driver._id,
      status: "completed",
    });
    res.status(200).json({
      status: "success",
      data: {
        completedBookings,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};
