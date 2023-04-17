const express = require("express");
const router = express.Router();

const driverAuthController = require("../../controllers/driverControllers/driverAuthController");
const driverHistoryController = require("../../controllers/driverControllers/driverHistoryController");

router.get(
  "/completedmissions",
  driverAuthController.protect,
  driverHistoryController.countCompletedBookings
);

router.get(
  "/computeDriverEarning",
  driverAuthController.protect,
  driverHistoryController.computeEarnings
);

router.get(
  "/listDriverCompletedRides",
  driverAuthController.protect,
  driverHistoryController.listCompletedRides
);

module.exports = router;
