const Driver = require("../../models/driverModel");
const Client = require("../../models/clientModel");
const Notification = require("../../models/notificationsModel");

exports.createNotification = async (req, res) => {
  try {
    const driver = await Driver.findOne({ _id: req.body.driverID });
    const client = await Client.findOne({ _id: req.body.clientID });

    if (!driver || !client) {
      return res.status(400).json({
        message:
          "Both sender and receiver should exist to send the notification",
      });
    }
    if (
      req.body.notificationType !== "ridecompletion" ||
      req.body.notificationType !== "ridecancellation"
    ) {
      return res.status(400).json({
        message:
          "Notification type should be one of the following: ridecompletion, ridecancellation",
      });
    }

    const notification = new Notification({
      title: req.body.title,
      message: req.body.message,
      notificationType: req.body.notificationType,
      receiver: req.body.driverID,
      sender: req.body.clientID,
      createdAt: Date.now(),
    });

    const savedNotification = await notification.save();
    driver.notifications.push(savedNotification._id);
    await driver.save();

    return res.status(200).json({
      message: "Notification sent successfully",
      notification: savedNotification,
    });
  } catch (err) {
    console.log(err);
  }
};

exports.getAllNotifications = async (req, res) => {
  try {
    const driver = await Driver.findById(req.driver._id);
    if (!driver) {
      return res.status(404).json({
        message:
          "The Driver was not found, and we are not able to fetch any notifications.",
      });
    }

    if (driver.notifications.length === 0) {
      return res.status(404).json({
        message: "You dont have any new notifications available to be fetched",
      });
    }

    const notificationsTobePopulated = await Notification.find({
      $and: [{ receiver: driver._id }, { archived: false }],
    });
    if (notificationsTobePopulated.length > 0) {
      return res.status(200).json({
        message: "Your notifications have been fetched",
        notifications: notificationsTobePopulated,
      });
    } else {
      return res.status(404).json({
        message: "You dont have any new notifications available to be fetched",
      });
    }
  } catch (err) {
    console.log(err);
  }
};

exports.fetchCurrentNotificationContent = async (req, res) => {
  try {
    const driver = await Driver.findOne({ _id: req.driver._id });
    if (!driver)
      return res
        .status(404)
        .json({ message: "There is no driver to fetch it's notifications" });

    const notificationToBeFetched = await Notification.findById(
      req.params.notificationID
    );
    if (!notificationToBeFetched) {
      return res
        .status(404)
        .json({ message: "The targeted notification does not exist" });
    }

    return res.status(200).json({
      message: "Notification content: ",
      notification: notificationToBeFetched,
    });
  } catch (err) {
    console.log(err);
  }
};

exports.deleteOneNotification = async (req, res) => {
  try {
    const driver = await Driver.findOne({ _id: req.driver._id });
    if (!driver)
      return res
        .status(404)
        .json({ message: "There is no driver to fetch it's notifications" });

    const notificationToBeDeleted = await Notification.findByIdAndDelete({
      _id: req.params.notificationID,
    });

    if (!notificationToBeDeleted) {
      return res.status(404).json({
        message: "The targeted notification does not exist",
      });
    }
    driver.notifications.pull(req.params.notificationID);
    await driver.save();

    return res
      .status(200)
      .json({ message: "The notification was successfully deleted" });
  } catch (err) {
    console.log(err);
  }
};

exports.deleteAllNotifications = async (req, res) => {
  try {
    const driver = await Driver.findOne({ _id: req.driver._id });
    if (!driver)
      return res
        .status(404)
        .json({ message: "There is no driver to fetch it's notifications" });

    const notificationsToBeDeleted = await Notification.deleteMany({
      receiver: driver._id,
    });

    if (!notificationsToBeDeleted) {
      return res.status(404).json({
        message: "There are no notifications to be deleted",
      });
    }

    driver.notifications = [];
    await driver.save();

    return res
      .status(200)
      .json({ message: "All notifications were successfully deleted" });
  } catch (err) {
    console.log(err);
  }
};

exports.markNotificationAsSeen = (req, res) => {
  try {
    const driver = Driver.findOne({ _id: req.driver._id });
    if (!driver)
      return res.status(404).json({ message: "Driver is not found" });

    const notificationToBeSeen = Notification.findById(
      req.params.notificationID
    );
    if (!notificationToBeSeen) {
      return res.status(404).json({
        message: "The targeted notification does not exist",
      });
    }

    notificationToBeSeen.seen = true;
    notificationToBeSeen.save();

    return res.status(200).json({
      message: "The notification was successfully marked as seen",
    });
  } catch (err) {
    console.log(err);
  }
};

exports.archiveNotification = async (req, res) => {
  try {
    const driver = await Driver.findOne({ _id: req.driver._id });
    if (!driver) {
      return res.status(404).json({ message: "Driver is not found" });
    }

    const notificationToBeArchived = await Notification.findById(
      req.params.notificationID
    );

    if (!notificationToBeArchived)
      return res
        .status(404)
        .json({ message: "The intended notification was not found" });

    notificationToBeArchived.archived = true;
    await notificationToBeArchived.save();
    driver.notifications.pull(notificationToBeArchived._id);
    driver.archivedNotifications.push(notificationToBeArchived._id);
    await driver.save();

    return res.status(200).json({
      message: "The notification was archived, and moved to your archived list",
    });
  } catch (err) {
    console.log(err);
  }
};
