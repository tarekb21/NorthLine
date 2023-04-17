const Client = require("../../models/clientModel");

exports.getClientCompletedRides = async (req, res) => {
  try {
    const client = await Client.findById(req.client.id);
    if (!client) {
      return res.status(404).json({
        message: "Couldn't find a client to fetch their history",
      });
    }

    const completedRides = await client.populate({
      path: "completedRides",
    });

    if (completedRides["completedRides"].length > 0) {
      return res.status(200).json({
        message: "Successfully fetched client's completed Rides",
        data: completedRides["completedRides"],
      });
    }
    return res.status(404).json({
      message: "You don't have any completed rides to fetch",
    });
  } catch (err) {
    console.log(err);
  }
};

exports.getClientScheduledRides = async (req, res) => {
  try {
    const client = await Client.findById(req.client.id);
    if (!client) {
      return res.status(404).json({
        message: "Couldn't find a client to fetch their history",
      });
    }

    const scheduledRides = await client.populate({
      path: "scheduledRides",
    });
    if (scheduledRides["scheduledRides"].length > 0) {
      return res.status(200).json({
        message: "Successfully fetched client's completed Rides",
        data: scheduledRides["scheduledRides"],
      });
    }
    return res.status(404).json({
      message: "You don't have any completed rides to fetch",
    });
  } catch (err) {
    console.log(err);
  }
};
