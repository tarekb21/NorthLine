const Driver = require("../../models/driverModel");
const Client = require("../../models/clientModel");

exports.getAllFollowers = async (req, res) => {
  try {
    const driver = await Driver.findById(req.driver.id);
    if (!driver) {
      return res.status(404).json({
        message: "Driver not found",
      });
    }

    if (driver.followers.length == 0) {
      return res.status(404).json({
        message: "You dont have any follower yet",
      });
    }

    const followers = await driver.populate({
      path: "followers",
      select: { fullname: 1, email: 1, phoneNumber: 1 },
    });

    return res.status(200).json({
      message: "Followers fetched successfully",
      data: followers["followers"],
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

exports.getFollowerDetails = async (req, res) => {
  try {
    const driver = await Driver.findById(req.driver.id);
    if (!driver) {
      return res.status(404).json({
        message: "Driver not found",
      });
    }

    if (driver.followers.length == 0) {
      return res.status(404).json({
        message: "You dont have any follower yet",
      });
    }

    if (!driver.followers.includes(req.params.clientID)) {
      return res.status(400).json({
        message:
          "You dont have this follower. And you cannot see their details",
      });
    }

    const follower = await Client.findById(req.params.clientID);
    if (!follower) {
      return res.status(404).json({
        message: "Follower not found",
      });
    }
    return res.status(200).json({
      message: "Follower details fetched successfully",
      data: follower,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

exports.removeFollower = async (req, res) => {
  try {
    const driver = await Driver.findById(req.driver.id);
    if (!driver) {
      return res.status(404).json({
        message: "Driver not found",
      });
    }

    if (driver.followers.length == 0) {
      return res.status(404).json({
        message: "You dont have any follower yet",
      });
    }

    if (!driver.followers.includes(req.params.clientID)) {
      return res.status(400).json({
        message: "You dont have this follower. And you cannot remove them",
      });
    }

    const follower = await Client.findById(req.params.clientID);
    if (!follower) {
      return res.status(404).json({
        message: "Follower not found",
      });
    }

    if (!follower.following.includes(req.driver.id)) {
      return res.status(404).json({
        message: "The intended client is not following you",
      });
    }

    driver.followers.pull(req.params.clientID);
    await driver.save();
    follower.following.pull(req.driver.id);
    await follower.save();

    return res.status(200).json({
      message: "Follower removed successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};
