const clientModel = require("../../models/clientModel");
const validator = require("validator");

exports.updateClientProfile = async (req, res) => {
  try {
    const client = await clientModel.findById(req.client.id);

    if (!client) {
      return res.status(404).json({
        message: "Client not found",
      });
    }
    const fullname = req.body.fullname;
    const email = req.body.email;
    const phoneNumber = req.body.phoneNumber;
    const address = req.body.address;

    if (
      fullname === "" ||
      email === "" ||
      phoneNumber === "" ||
      address === ""
    ) {
      return res.status(400).json({
        message: "Please provide all the required fields",
      });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({
        message: "Please provide a valid email address",
      });
    }

    if (
      (email || phoneNumber) &&
      email !== client.email &&
      phoneNumber !== client.phoneNumber
    ) {
      const clientExists = await clientModel.findOne({
        $or: [{ email }, { phoneNumber }],
      });

      if (clientExists) {
        return res.status(400).json({
          message: "Client with the same email or phone number already exists",
        });
      }
    }
    client.fullname = fullname;
    client.email = email;
    client.phoneNumber = phoneNumber;
    client.address = address;

    await client.save();

    return res.status(200).json({ updatedClient: client });
  } catch (err) {
    console.log(err);
  }
};

exports.getUserProfileDetails = async (req, res) => {
  try {
    const client = await clientModel.findById(req.client.id);

    if (!client) {
      return res.status(404).json({
        message: "Client not found",
      });
    }

    const { fullname, email, phoneNumber, address } = client;

    return res.status(200).json({
      profileInfo: {
        fullname,
        email,
        phoneNumber,
        address,
      },
    });
  } catch (err) {
    console.log(err);
  }
};
