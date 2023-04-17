const express = require("express");
const router = express.Router();
const clientPofileController = require("../../controllers/clientControllers/clientProfileController");
const clientAuthController = require("../../controllers/clientControllers/clientAuthentication");

router.patch(
  "/updateclientprofile",
  clientAuthController.protect,
  clientPofileController.updateClientProfile
);

router.get(
  "/getprofiledetails",
  clientAuthController.protect,
  clientPofileController.getUserProfileDetails
);

module.exports = router;
