const express = require("express");
const router = express.Router();

const clientAuthController = require("../../controllers/clientControllers/clientAuthentication");
const clientFollowSystemController = require("../../controllers/clientControllers/followDriverController");

router.patch(
  "/followUnfollowDriver",
  clientAuthController.protect,
  clientFollowSystemController.followUnfollowDriver
);

router.get(
  "/getClientFollowingList",
  clientAuthController.protect,
  clientFollowSystemController.getFollowingList
);
module.exports = router;
