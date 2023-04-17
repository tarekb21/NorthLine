const express = require("express");
const router = express.Router();

const clientAuthController = require("../../controllers/clientControllers/clientAuthentication");

router.post("/newClient", clientAuthController.clientSignup);
router.post("/clientLogin", clientAuthController.clientLogin);
router.patch(
  "/updatedriverpassword",
  clientAuthController.protect,
  clientAuthController.updateClientPassword
);
module.exports = router;
