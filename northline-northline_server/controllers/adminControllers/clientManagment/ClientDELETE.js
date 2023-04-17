const Client = require("../../../models/clientModel");

exports.deleteAllClients = async (req, res) => {
  try {
    const clients = await Client.deleteMany({});
    if (clients.deletedCount > 0) {
      res.status(200).json({
        message: "All clients are deleted successfully",
      });
    }
    return res.status(404).json({
      message: "There is no clients to delete them",
    });
  } catch (err) {
    console.log(err);
  }
};

exports.deleteClient = async (req, res) => {
  try {
    const client = await Client.findOneAndRemove({
      $or: [
        { _id: req.body.clientID },
        { email: req.body.email },
        { phoneNumber: req.body.phoneNumber },
      ],
    });

    if (!client) {
      return res.status(404).json({
        message: "Client with the provided details does not exist.",
      });
    }
    res.status(200).json({
      message: "Client is deleted successfully",
    });
  } catch (err) {
    console.log(err);
  }
};
