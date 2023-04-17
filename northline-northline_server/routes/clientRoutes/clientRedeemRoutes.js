const express = require("express");
const router = express.Router();
const clientDiscountRedeemController = require("../../controllers/clientControllers/clientDiscountRedeemController");
const clientAuthController = require("../../controllers/clientControllers/clientAuthentication");

router.post(
  "/redeemPromoCode",
  clientAuthController.protect,
  clientDiscountRedeemController.redeemPromoCode
);

module.exports = router;
