const paymentModel = require("../../models/clientPaymentCardModel");
const clientModel = require("../../models/clientModel");
const security = require("./securityController");

exports.addNewPaymentCard = async (req, res) => {
  try {
    const client = await clientModel.findById(req.client.id);
    if (!client) {
      return res.status(404).json({ message: "Client not found" });
    }
    const encryptedCard = security.encryptData(req.body.cardNumber);
    let encryptedCardNumber = encryptedCard.encryptedData;
    let iv = encryptedCard.iv;

    const paymentCard = await paymentModel.findOne({
      cardNumber: req.body.cvv,
    });

    if (paymentCard) {
      if (!client.paymentCards.includes(paymentCard._id)) {
        client.paymentCards.push(paymentCard._id);
        await client.save();
        return res.status(200).json({
          message:
            "The Payment Card exist and it has been added to your list successfully.",
        });
      }
      return res.status(409).json({
        message: "This payment card already exist in your saved list",
        card: paymentCard,
      });
    }

    //2- create a new payment card
    const newPaymentCard = new paymentModel({
      cardNumber: encryptedCardNumber,
      cardHolderName: req.body.cardHolderName,
      expiryDate: req.body.expiryDate,
      cvv: req.body.cvv,
      belongTo: req.client.id,
      iv: iv,
    });
    await newPaymentCard.save();
    client.paymentCards.push(newPaymentCard._id);
    await client.save();

    return res
      .status(200)
      .json({ message: "Payment card has been created", card: newPaymentCard });
  } catch (err) {
    console.log(err);
  }
};

exports.getCurrentDriverCerditCards = async (req, res) => {
  try {
    const client = await clientModel.findById(req.client.id);
    if (!client) {
      return res.status(404).json({ message: "Client is not found" });
    }

    const paymentCards = await client.populate({
      path: "paymentCards",
      select: "-_id -belongTo -__v ",
    });

    if (paymentCards["paymentCards"].length === 0) {
      return res.status(404).json({
        message: "You have no payment cards. Start by adding a new one",
      });
    }

    const newData = paymentCards["paymentCards"].map((card) => {
      let encryptedData = { encryptedData: card.cardNumber, iv: card.iv };
      const decryptedCardNumber = security.decryptData(encryptedData);
      return {
        cardNumber: decryptedCardNumber,
        cardHolderName: card.cardHolderName,
        expiryDate: card.expiryDate,
        cvv: card.cvv,
      };
    });

    return res.status(200).json({
      message: "Payment cards has been retrieved",
      cards: newData,
    });
  } catch (err) {
    console.log(err);
  }
};

exports.deletePaymentCard = async (req, res) => {
  try {
    const client = await clientModel.findById(req.client.id);
    if (!client) {
      return res.status(404).json({ message: "Client is not found" });
    }

    const paymentCard = await paymentModel.findOne({ _id: req.params.cvv });
    if (!paymentCard) {
      return res.status(404).json({ message: "Payment card is not found" });
    }
    if (
      !client.paymentCards.includes(paymentCard._id) ||
      client._id.toString() !== paymentCard.belongTo.toString()
    ) {
      return res.status(401).json({
        message:
          "You are not authorized to delete a payment card that does not belong to you",
      });
    }

    client.paymentCards.pull(paymentCard._id);
    await client.save();
    await paymentModel.deleteOne({ _id: paymentCard._id });

    return res
      .status(200)
      .json({ message: "You Payment Card has been deleted successfully !!" });
  } catch (err) {
    console.log(err);
  }
};

exports.updatePaymentCard = async (req, res) => {
  try {
    const client = await clientModel.findById(req.client.id);
    if (!client) {
      return res.status(404).json({ message: "Client is not found" });
    }

    const paymentCard = await paymentModel.findOne({ _id: req.params.cvv });
    if (!paymentCard) {
      return res.status(404).json({ message: "Payment card is not found" });
    }

    if (
      !client.paymentCards.includes(paymentCard._id) ||
      client._id.toString() !== paymentCard.belongTo.toString()
    ) {
      return res.status(401).json({
        message:
          "You are not authorized to delete a payment card that does not belong to you",
      });
    }

    if (req.body.cardNumber || req.body.cvv) {
      return res
        .status(400)
        .json({ message: "You can't update the card number or cvv" });
    }
    paymentCard.cardHolderName = req.body.cardHolderName;
    paymentCard.expiryDate = req.body.expiryDate;
    await paymentCard.save();
    return res
      .status(200)
      .json({ message: "Your Payment Card has been updated successfully" });
  } catch (err) {
    console.log(err);
  }
};

exports.getPaymentCardByID = async (req, res) => {
  try {
    const paymentCard = await paymentModel.findOne({ _id: req.params.cardID });
    if (!paymentCard)
      return res.status(404).json({ message: "Card not found" });
    let encryptedData = {
      encryptedData: paymentCard.cardNumber,
      iv: paymentCard.iv,
    };
    const decryptedCard = security.decryptData(encryptedData);

    return res.status(200).json({
      message: "Your card details",
      card: {
        cardNumber: decryptedCard,
        cvv: paymentCard.cvv,
        holderName: paymentCard.cardHolderName,
        expiryDate: paymentCard.expiryDate,
      },
    });
  } catch (err) {
    console.log(err);
  }
};
