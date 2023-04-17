const Ride = require("../../../models/taxiBookingModel");

exports.getAllRides = async (req, res) => {
  try {
    const rides = await Ride.find();

    if (rides.length === 0) {
      return res.status(404).json({
        message: "No rides found",
      });
    }

    return res.status(200).json({
      message: "The platform rides are: ",
      data: rides,
    });
  } catch (err) {
    console.log(err);
  }
};

exports.getCertainRides = async (req, res) => {
  try {
    const rides = await Ride.find({
      $and: [{ client: req.body.clientID }, { driver: req.body.driverID }],
    });

    if (rides.length === 0) {
      return res.status(404).json({
        message: "No rides found",
      });
    }

    return res.status(200).json({
      message: "The platform rides are: ",
      data: rides,
    });
  } catch (err) {
    console.log(err);
  }
};

exports.getPendingRides = async (req, res) => {
  try {
    const pendingRides = await Ride.find({ $eq: { status: "pending" } });

    if (pendingRides.length === 0) {
      return res.status(404).json({
        message: "No pending rides found",
      });
    }
    return res.status(200).json({
      message: "Pending rides are:",
      data: pendingRides,
    });
  } catch (err) {
    console.log(err);
  }
};

exports.getAcceptedRides = async (req, res) => {
  try {
    const acceptedRides = await Ride.find({ $eq: { status: "accepted" } });

    if (acceptedRides.length === 0) {
      return res.status(404).json({
        message: "No accepted rides found",
      });
    }
    return res.status(200).json({
      message: "Accepted rides are:",
      data: acceptedRides,
    });
  } catch (err) {
    console.log(err);
  }
};

exports.getCancelled_Or_RejectedRides = async (req, res) => {
  try {
    const rides = await Ride.find({
      $or: [{ $eq: { status: "cancelled" } }, { $eq: { status: "rejected" } }],
    });

    if (rides.length === 0) {
      return res.status(404).json({
        message: "No Cancelled or Rejected rides found",
      });
    }
    return res.status(200).json({
      message: "Cancelled or Rejected rides are:",
      data: rides,
    });
  } catch (err) {
    console.log(err);
  }
};
