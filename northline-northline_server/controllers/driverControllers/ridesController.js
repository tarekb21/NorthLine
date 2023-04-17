const Driver = require("../../models/driverModel");
const Client = require("../../models/clientModel");
const TaxiBooking = require("../../models/taxiBookingModel");

exports.acceptRide = async (req, res) => {
  try {
    const driver = await Driver.findById(req.driver.id);
    if (!driver) {
      return res.status(404).json({
        message: "Driver not found",
      });
    }
    const client = await Client.findById(req.body.client);
    if (!client) {
      return res.status(404).json({
        message: "Client not found",
      });
    }

    if (driver.isAvailable == false) {
      return res.status(400).json({
        message: "Driver is not available",
      });
    }

    const rideToBeAccepted = await TaxiBooking.findById(req.body.rideID);
    if (!rideToBeAccepted) {
      return res.status(404).json({
        message: "Ride not found, it has been cancelled by the client",
      });
    }

    if (rideToBeAccepted.driver.toString() !== req.driver.id.toString()) {
      return res.status(400).json({
        message: "You can only accept rides that belong to you",
      });
    }
    if (rideToBeAccepted.status === "accepted") {
      return res.status(400).json({
        message: "Ride already accepted",
      });
    }

    rideToBeAccepted.status = "accepted";
    await rideToBeAccepted.save();

    return res.status(201).json({
      message: "Ride accepted, the driver is on the way",
      data: {
        rideToBeAccepted,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

exports.markRideAsCompleted = async (req, res) => {
  try {
    const rideToBeCompleted = await TaxiBooking.findById(req.body.rideID);

    if (!rideToBeCompleted) {
      return res.status(404).json({
        message: "Ride not found",
      });
    }

    const driver = await Driver.findById(rideToBeCompleted.driver);
    if (!driver) {
      return res.status(404).json({
        message: "Driver not found",
      });
    }
    const client = await Client.findById(rideToBeCompleted.client);
    if (!client) {
      return res.status(404).json({
        message: "Client not found",
      });
    }

    rideToBeCompleted.status = "completed";
    await rideToBeCompleted.save();
    driver.totalEarnings = driver.totalEarnings + rideToBeCompleted.rideFees;
    driver.isAvailable = true;
    driver.pendingRides.pull(rideToBeCompleted._id);
    driver.completedRides.push(rideToBeCompleted._id);
    client.totalSpending = client.totalSpending + rideToBeCompleted.rideFees;
    client.scheduledRides.pull(rideToBeCompleted._id);
    client.completedRides.push(rideToBeCompleted._id);
    await driver.save();
    await client.save();

    return res.status(201).json({
      message: "Ride completed",
      data: {
        rideToBeCompleted,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

exports.rejectRide = async (req, res) => {
  try {
    const rideToBeRejected = await TaxiBooking.findById(req.params.rideID);

    if (!rideToBeRejected) {
      return res.status(404).json({
        message: "Ride not found",
      });
    }

    if (rideToBeRejected.status !== "pending") {
      return res.status(400).json({
        message: "You can reject, a ride that is not pending",
      });
    }

    const driver = await Driver.findById(rideToBeRejected.driver);
    if (!driver) {
      return res.status(404).json({
        message: "Driver not found",
      });
    }
    const client = await Client.findById(rideToBeRejected.client);
    if (!client) {
      return res.status(404).json({
        message: "Client not found",
      });
    }

    rideToBeRejected.status = "rejected";
    await rideToBeRejected.save();

    driver.isAvailable = true;
    driver.pendingRides.pull(rideToBeRejected._id);
    client.scheduledRides.pull(rideToBeRejected._id);
    await driver.save();
    await client.save();

    return res.status(201).json({
      message: "Ride rejected. Please Book another driver",
      data: {
        rideToBeRejected,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};
