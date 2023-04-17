const Client = require("../../models/clientModel");
const Driver = require("../../models/driverModel");
const TaxiBooking = require("../../models/taxiBookingModel");

exports.requestRide = async (req, res) => {
  try {
    const client = await Client.findById(req.client.id);
    if (!client) {
      return res.status(404).json({ msg: "Client not found" });
    }

    const driver = await Driver.findOne({ phoneNumber: req.body.selectDriver });
    console.log(driver);
    if (!driver) {
      return res
        .status(404)
        .json({ msg: "Driver not found, or unavailable right now" });
    }

    if (!client.following.includes(driver.id)) {
      return res.status(400).json({
        message: "You can only request rides from drivers you follow",
      });
    }

    const taxiBooking = await TaxiBooking.create({
      client: req.client.id,
      driver: driver._id,
      rideFees: req.body.rideFees,
      estimatedDepartureTime: req.body.estimatedDepartureTime,
      estimatedArrivalTime: req.body.estimatedArrivalTime,
      departureLocation: req.body.departureLocation,
      destinationLocation: req.body.destinationLocation,
      status: "pending",
    });

    driver.pendingRides.push(taxiBooking._id);
    client.scheduledRides.push(taxiBooking._id);
    await driver.save();
    await client.save();

    return res.status(201).json({
      message: "Successfully requested ride",
      taxiBooking,
    });
  } catch (err) {
    console.log(err);
  }
};

exports.cancelRideRequest = async (req, res) => {
  try {
    const rideToBeCanceled = await TaxiBooking.findById(req.body.rideID);
    if (!rideToBeCanceled) {
      return res.status(404).json({
        message: "Ride to be canceled does not exist",
      });
    }
    const client = await Client.findById(req.client.id);
    if (!client) {
      return res.status(404).json({ msg: "Client was not found" });
    }

    const driver = await Driver.findById(rideToBeCanceled.driver);
    if (!driver) {
      return res.status(404).json({ msg: "Driver was not found" });
    }

    if (rideToBeCanceled.status !== "pending") {
      return res.status(400).json({
        message: "You can only cancel rides that are still pending",
      });
    }

    if (rideToBeCanceled.client.toString() !== client._id.toString()) {
      return res.status(400).json({
        message: "You can only cancel rides that only belongs to you",
      });
    }

    rideToBeCanceled.status = "cancelled";
    await rideToBeCanceled.save();

    await driver.updateOne({ $pull: { pendingRides: rideToBeCanceled._id } });
    await client.updateOne({ $push: { cancelledRides: rideToBeCanceled._id } });
    await client.updateOne({ $pull: { scheduledRides: rideToBeCanceled._id } });

    return res.status(200).json({
      message: "Successfully cancelled ride",
    });
  } catch (err) {
    console.log(err);
  }
};
