const express = require("express");
const router = express.Router();

const driverPaymentController = require("../../controllers/driverControllers/driverPaymentController");
const driverAuthController = require("../../controllers/driverControllers/driverAuthController");

router.post(
  "/drivernewpaymentcard",
  driverAuthController.protect,
  driverPaymentController.addNewPaymentCard
);

router.get(
  "/drivercards",
  driverAuthController.protect,
  driverPaymentController.getCurrentDriverCerditCards
);

router.delete(
  "/deletepaymentcard/:cvv",
  driverAuthController.protect,
  driverPaymentController.deletePaymentCard
);

router.patch(
  "/updatepaymentcard/:cvv",
  driverAuthController.protect,
  driverPaymentController.updatePaymentCard
);

router.get(
  "/drivercard/:cvv",
  driverAuthController.protect,
  driverPaymentController.getPaymentCardByID
);

module.exports = router;
