const Client = require("../../../models/clientModel");

exports.getClients = async (req, res) => {
  try {
    const clients = await Client.find();

    if (clients.length === 0) {
      return res.status(404).json({
        message: "No clients found",
      });
    }

    return res.status(200).json({
      message: "The platform clients are: ",
      data: clients,
    });
  } catch (err) {
    console.log(err);
  }
};

exports.getClient = async (req, res) => {
  try {
    const client = await Client.findOne({
      $or: [
        { _id: req.body.clientID },
        { email: req.body.email },
        { phoneNumber: req.body.phoneNumber },
      ],
    });

    if (!client) {
      return res.status(404).json({
        message: "Client not found",
      });
    }

    return res.status(200).json({
      message: "Client found",
      data: client,
    });
  } catch (err) {
    console.log(err);
  }
};
