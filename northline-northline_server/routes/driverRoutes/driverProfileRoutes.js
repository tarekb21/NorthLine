const express = require("express");
const router = express.Router();
const driverPofileController = require("../../controllers/driverControllers/driverProfileController");
const driverAuthController = require("../../controllers/driverControllers/driverAuthController");

router.patch(
  "/updatedriverprofile",
  driverAuthController.protect,
  driverPofileController.updateDriverProfile
);

router.get(
  "/getprofiledetails",
  driverAuthController.protect,
  driverPofileController.getUserProfileDetails
);

module.exports = router;
