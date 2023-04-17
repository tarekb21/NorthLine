const express = require("express");
const router = express.Router();

const clientAuthController = require("../../controllers/clientControllers/clientAuthentication");
const clientHistoryController = require("../../controllers/clientControllers/clientHistoryController");

router.get(
  "/clientScheduledRides",
  clientAuthController.protect,
  clientHistoryController.getClientScheduledRides
);

router.get(
  "/clientCompletedRides",
  clientAuthController.protect,
  clientHistoryController.getClientCompletedRides
);
module.exports = router;
