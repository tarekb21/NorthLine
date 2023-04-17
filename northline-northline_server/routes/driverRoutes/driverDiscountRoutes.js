const express = require("express");
const router = express.Router();

const driverAuthController = require("../../controllers/driverControllers/driverAuthController");
const driverDiscountController = require("../../controllers/driverControllers/driverDiscountsController");

router.post(
  "/createcoupon",
  driverAuthController.protect,
  driverDiscountController.createDiscount
);

router.get(
  "/:promoID/details",
  driverAuthController.protect,
  driverDiscountController.getDiscountDetails
);

router.get(
  "/showactivediscounts",
  driverAuthController.protect,
  driverDiscountController.showActiveDiscounts
);

router.get(
  "/:promoID/checkDiscountValidity",
  driverAuthController.protect,
  driverDiscountController.checkDiscountValidity
);

router.patch(
  "/:discountID/diactivateDiscountCode",
  driverAuthController.protect,
  driverDiscountController.diactivateDiscountCode
);

router.delete(
  "/:discountID/deleteDiscountCode",
  driverAuthController.protect,
  driverDiscountController.deleteDiscountCode
);
module.exports = router;
