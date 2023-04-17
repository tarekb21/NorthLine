const Driver = require("../../models/driverModel");
const Promo = require("../../models/promoModel");

function generateRandomID() {
  let randomNumb = Math.random();
  let randomTime = new Date().getMilliseconds();
  let preparingID = randomNumb
    .toString()
    .split(".")[1]
    .concat(randomTime)
    .concat(randomNumb.toString().split(".")[1]);

  let ID = "Discount-" + preparingID.substring(0, 6);
  return ID;
}

exports.createDiscount = async (req, res) => {
  try {
    const driver = await Driver.findById(req.driver.id);
    if (!driver) {
      return res.status(404).json({
        message: "Driver not found",
      });
    }

    const newPromo = await Promo.create({
      owner: req.driver.id,
      code: generateRandomID(),
      discountValue: req.body.discountValue / 100,
      startDate: new Date().getHours(),
      endDate: new Date().getHours() + req.body.expiryHour,
      expiryHour: req.body.expiryHour,
      isActive: "true",
      limit: req.body.limit,
    });

    driver.discounts.push(newPromo._id);
    await driver.save();
    return res.status(201).json({
      message: "Promo added",
      data: {
        newPromo,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

exports.getDiscountDetails = async (req, res) => {
  try {
    const driver = await Driver.findById(req.driver.id);
    if (!driver) {
      return res.status(404).json({
        message: "Driver not found",
      });
    }
    const promo = await Promo.findById(req.params.promoID);
    if (!promo) {
      return res.status(404).json({
        message: "Promo not found",
      });
    }

    if (!driver.discounts.includes(promo.id)) {
      return res
        .status(401)
        .json({ message: "You can only check discounts created by you" });
    }

    return res.status(200).json({
      message: "Promo details",
      data: {
        promo,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

exports.showActiveDiscounts = async (req, res) => {
  try {
    const driver = await Driver.findById(req.driver.id);
    if (!driver) {
      return res.status(404).json({
        message: "Driver not found",
      });
    }
    const activeDiscounts = await Promo.find({
      owner: req.driver.id,
      isActive: "true",
    });
    if (!activeDiscounts) {
      return res.status(404).json({
        message: "No active discounts",
      });
    }

    return res.status(200).json({
      message: "Active discounts",
      data: {
        activeDiscounts,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

exports.checkDiscountValidity = async (req, res) => {
  try {
    const driver = await Driver.findById(req.driver.id);
    if (!driver) {
      return res.status(404).json({
        message: "Driver not found",
      });
    }
    const promo = await Promo.findById(req.params.promoID);
    if (!promo) {
      return res.status(404).json({
        message: "Promo not found",
      });
    }
    if (!driver.discounts.includes(promo.id)) {
      return res
        .status(401)
        .json({ message: "You can only check discounts created by you" });
    }
    if (promo.isActive == "false") {
      return res.status(409).json({
        message: "The Promo code is not active anymore",
      });
    }
    if (new Date().getHours() + promo.expiryHour > promo.endDate) {
      return res.status(409).json({
        message: "The Promo code has expired",
      });
    }
    console.log(new Date().getHours() + promo.expiryHour);
    if (promo.limit === 0) {
      return res.status(409).json({
        message: "The Promo code has been used completely",
      });
    }

    return res.status(200).json({
      message: "Promo is valid",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

exports.diactivateDiscountCode = async (req, res) => {
  try {
    const promoCodeToBeDeactivated = await Promo.findById(
      req.params.discountID
    );
    if (!promoCodeToBeDeactivated) {
      return res.status(404).json({
        message: "Promo not found",
      });
    }

    if (promoCodeToBeDeactivated.isActive === "false") {
      return res.status(409).json({
        message: "Discount Code is already inactive",
      });
    }
    const driver = await Driver.findById(req.driver.id);
    if (driver._id.toString() !== promoCodeToBeDeactivated.owner.toString()) {
      return res.status(401).json({
        message: "You can only diactivate discounts created by you",
      });
    }
    promoCodeToBeDeactivated.isActive = false;
    await promoCodeToBeDeactivated.save();

    driver.discounts.pull(promoCodeToBeDeactivated._id);
    await driver.save();
    return res.status(200).json({
      message: "Promo code has been deactivated successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

exports.deleteDiscountCode = async (req, res) => {
  try {
    const promoToBeDeleted = await Promo.findByIdAndDelete(
      req.params.discountID
    );
    if (!promoToBeDeleted) {
      return res.status(404).json({
        message: "Promo not found",
      });
    }
    const driver = await Driver.findById(promoToBeDeleted.owner);
    driver.discounts.pull(promoToBeDeleted._id);
    await driver.save();
    return res.status(200).json({
      message: "Promo deleted",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};
