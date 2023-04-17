const Driver = require("../../models/driverModel");
const Client = require("../../models/clientModel");

exports.followUnfollowDriver = async (req, res) => {
  try {
    const driver = await Driver.findById(req.body.driverID);

    if (!driver) {
      return res.status(404).json({
        message: "Driver to be followed was not found",
      });
    }

    const client = await Client.findById(req.client.id);

    if (!client) {
      return res.status(404).json({
        message: "Client that need to perform the follow request was not found",
      });
    }

    if (driver.followers.includes(client.id)) {
      await driver.updateOne({ $pull: { followers: client.id } });
      await client.updateOne({ $pull: { following: driver.id } });

      return res
        .status(200)
        .json({ message: "The Driver has been unfollowed" });
    }

    if (
      driver.followers.includes(client.id) &&
      !client.following.includes(driver.id)
    ) {
      await client.updateOne({ $push: { following: driver.id } });
      client.following.push(driver.id);
      await client.save();

      return res
        .status(200)
        .json({ message: "You are already following this driver" });
    }

    await driver.updateOne({ $push: { followers: client.id } });
    await client.updateOne({ $push: { following: driver.id } });

    return res.status(200).json({ message: "The Driver has been followed" });
  } catch (err) {
    console.log(err);
  }
};

exports.getFollowingList = async (req, res) => {
  try {
    const client = await Client.findById(req.client.id);
    if (!client) {
      return res.status(404).json({
        message: "Current client not found",
      });
    }

    const following = await client.populate({
      path: "following",
      select: "fullname phoneNumber email",
    });
    if (following["following"].length > 0) {
      return res.status(200).json({
        message: "Following list fetched successfully",
        data: following["following"],
      });
    }
    return res
      .status(404)
      .json({ message: "You are not following any driver" });
  } catch (err) {
    console.log(err);
  }
};
