const Client = require("../../../models/clientModel");

const bcrypt = require("bcrypt");
const validator = require("validator");

exports.clientUpdate = async (req, res) => {
  try {
    const client = await Client.findOne({
      $or: [
        { _id: req.body.clientID },
        { phoneNumber: req.body.phoneNumber },
        { email: req.body.email },
      ],
    });

    if (!client) {
      return res.status(404).json({
        message: "Client with the provided details does not exist.",
      });
    }

    if (!validator.isEmail(req.body.email)) {
      return res.status(400).json({
        message: "Please provide a valid email address",
      });
    }

    const salt = await bcrypt.genSalt(12);
    let hashedPassword;

    if (req.body.password) {
      hashedPassword = await bcrypt.hash(req.body.password, salt);
    }

    const checkEmailPhone = await Client.findOne({
      $or: [{ email: req.body.email }, { phoneNumber: req.body.phoneNumber }],
    });
    if (checkEmailPhone) {
      return res.status(409).json({
        message: "The email/PhoneNumber you are trying to use already exists",
      });
    }
    client.fullname = req.body.fullname;
    client.email = req.body.email;
    client.phoneNumber = req.body.phoneNumber;
    client.password = hashedPassword;
    client.address = req.body.address;
    client.age = req.body.age;
    client.type = req.body.type;

    await client.save();

    return res.status(200).json({
      message: "Client updated successfully",
      data: client,
    });
  } catch (err) {
    console.log(err);
  }
};
