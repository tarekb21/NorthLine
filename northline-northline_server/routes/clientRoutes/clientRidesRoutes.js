const express = require("express");
const router = express.Router();

const clientAuthController = require("../../controllers/clientControllers/clientAuthentication");
const clientRidesController = require("../../controllers/clientControllers/clientRidesController");

router.post(
  "/requestRide",
  clientAuthController.protect,
  clientRidesController.requestRide
);

router.patch(
  "/cancelRideRequest",
  clientAuthController.protect,
  clientRidesController.cancelRideRequest
);
module.exports = router;
