const express = require("express");
const router = express.Router();

const clientAuthController = require("../../controllers/clientControllers/clientAuthentication");
const clientReviewController = require("../../controllers/clientControllers/clientRideReviewController");

router.post(
  "/submitReview",
  clientAuthController.protect,
  clientReviewController.submitReview
);
module.exports = router;
