const express = require("express");
const router = express.Router();

const driverAuthController = require("../../controllers/driverControllers/driverAuthController");
const driverRidesController = require("../../controllers/driverControllers/ridesController");

router.patch(
  "/acceptRide",
  driverAuthController.protect,
  driverRidesController.acceptRide
);

router.patch(
  "/markRideAsCompleted",
  driverAuthController.protect,
  driverRidesController.markRideAsCompleted
);

module.exports = router;
