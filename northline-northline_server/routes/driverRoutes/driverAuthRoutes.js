const express = require("express");
const router = express.Router();

const driverAuthController = require("../../controllers/driverControllers/driverAuthController");

router.post("/newDriver", driverAuthController.driverSignup);
router.post("/driverLogin", driverAuthController.driverLogin);
router.patch(
  "/updatedriverpassword",
  driverAuthController.protect,
  driverAuthController.updateDriverPassword
);
module.exports = router;
