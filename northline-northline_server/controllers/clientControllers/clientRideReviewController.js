const Client = require("../../models/clientModel");
const Driver = require("../../models/driverModel");
const BookingModel = require("../../models/taxiBookingModel");
const Review = require("../../models/reviewModel");

exports.submitReview = async (req, res) => {
  try {
    const review = await Review.findById(req.body.rideID);

    if (review) {
      return res
        .status(200)
        .json({ message: "You've already submitted a review." });
    }

    const client = await Client.findById(req.client.id);
    if (!client) {
      return res
        .status(400)
        .json({ message: "A review must belong to a client" });
    }

    const driverToBeReviewed = await Driver.findById(req.body.driverID);

    if (!driverToBeReviewed) {
      return res
        .status(400)
        .json({ message: "A review must be assigned to a driver" });
    }

    const rideToBeReviewed = await BookingModel.findOne({
      $and: [{ client: client._id }, { driver: driverToBeReviewed._id }],
    });

    if (!rideToBeReviewed) {
      return res.status(400).json({
        message: "You cannot review a ride that does not belong to you ",
      });
    }

    if (rideToBeReviewed.status !== "completed") {
      return res.status(400).json({
        message: "You cannot review a ride that is not completed yet",
      });
    }

    const newReview = await Review.create({
      message: req.body.message,
      rating: req.body.rating,
      driver: req.body.driverID,
      reviewOwner: req.client.id,
      ride: req.body.rideID,
    });

    await driverToBeReviewed.updateOne({ $push: { ratings: newReview._id } });

    return res
      .status(201)
      .json({ message: "Review Posted", review: newReview });
  } catch (err) {
    console.log(err);
  }
};
