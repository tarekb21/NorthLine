const express = require("express");
const router = express.Router();

const driverAuthController = require("../../controllers/driverControllers/driverAuthController");
const driverFollowerController = require("../../controllers/driverControllers/driverFollowersController");

router.get(
  "/getAllFollowers",
  driverAuthController.protect,
  driverFollowerController.getAllFollowers
);

router.get(
  "/:clientID/getFollowerDetails",
  driverAuthController.protect,
  driverFollowerController.getFollowerDetails
);

router.delete(
  "/:clientID/removeFollower",
  driverAuthController.protect,
  driverFollowerController.removeFollower
);

module.exports = router;
