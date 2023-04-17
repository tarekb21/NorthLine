const Client = require("../../models/clientModel");
const Promo = require("../../models/promoModel");

exports.redeemPromoCode = async (req, res) => {
  try {
    const client = await Client.findById(req.client.id);
    if (!client) {
      return res.status(404).json({ message: "The Client does not exist" });
    }

    const promoToBeUsed = await Promo.findOne({ code: req.body.promoCode });
    if (!promoToBeUsed) {
      return res.status(404).json({ message: "The Promo Code does not exist" });
    }

    if (!client.following.includes(promoToBeUsed.owner.toString())) {
      return res.status(400).json({
        message: "You can only redeem promo code for drivers you follow",
      });
    }

    if (promoToBeUsed.isActive == "false") {
      return res.status(409).json({
        message: "The Promo code is not active anymore",
      });
    }
    console.log(new Date().getHours() + promoToBeUsed.expiryHour);
    if (
      new Date().getHours() + promoToBeUsed.expiryHour >
      promoToBeUsed.endDate
    ) {
      promoToBeUsed.isActive = "false";
      await promoToBeUsed.save();
      return res.status(409).json({
        message: "The Promo code has expired",
      });
    }

    if (promoToBeUsed.limit === 0) {
      return res.status(409).json({
        message: "The Promo code has been used completely",
      });
    }

    promoToBeUsed.limit = promoToBeUsed.limit - 1;
    await promoToBeUsed.save();
    await client.updateOne({ $push: { usedPromoCodes: promoToBeUsed._id } });

    return res.status(200).json({
      message: "The Promo code has been redeemed successfully",
    });
  } catch (err) {
    console.log(err);
  }
};
