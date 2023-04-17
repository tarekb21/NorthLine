const express = require("express");
const db = require("./database").connectDB;
const port = process.env.PORT;
const app = express();

//TODO: followers from driver
// Routes
const driverAuthRoutes = require("./routes/driverRoutes/driverAuthRoutes");
const driverProfileRoutes = require("./routes/driverRoutes/driverProfileRoutes");
const driverPaymentRoutes = require("./routes/driverRoutes/driverPaymentsRoutes");
const driverDiscountRoutes = require("./routes/driverRoutes/driverDiscountRoutes");
const driverRidesRoutes = require("./routes/driverRoutes/driverRidesRoutes");
const driverHistoryRoutes = require("./routes/driverRoutes/driverHistoryRoutes");
const driverFollowerRoutes = require("./routes/driverRoutes/driverFollowersRoutes");

const clientAuthRoutes = require("./routes/clientRoutes/clientAuthRoutes");
const clientProfileRoutes = require("./routes/clientRoutes/clientProfileRoutes");
const clientFollowSystemRoutes = require("./routes/clientRoutes/clientFollowSystemRoutes");
const clientRidesRoutes = require("./routes/clientRoutes/clientRidesRoutes");
const clientRedeemRoutes = require("./routes/clientRoutes/clientRedeemRoutes");
const clientHistoryRoutes = require("./routes/clientRoutes/clientHistoryRoutes");
const clientReviewRoutes = require("./routes/clientRoutes/clientReviewRoutes");
db();

app.use(express.json());
app.use("/api/v1/drivers/auth", driverAuthRoutes);
app.use("/api/v1/drivers/driver/", driverProfileRoutes);
app.use("/api/v1/payments/driver/", driverPaymentRoutes);
app.use("/api/v1/discounts/driver/", driverDiscountRoutes);
app.use("/api/v1/driver/rides/", driverRidesRoutes);
app.use("/api/v1/driver/history", driverHistoryRoutes);
app.use("/api/v1/driver/followers", driverFollowerRoutes);

app.use("/api/v1/clients/auth", clientAuthRoutes);
app.use("/api/v1/clients/client/", clientProfileRoutes);
app.use("/api/v1/clients/followDrivers/", clientFollowSystemRoutes);
app.use("/api/v1/clients/rides/", clientRidesRoutes);
app.use("/api/v1/clients/discounts/", clientRedeemRoutes);
app.use("/api/v1/clients/history/", clientHistoryRoutes);
app.use("/api/v1/clients/reviews/", clientReviewRoutes);

const server = app.listen(port, () => {
  console.log(`Server running on port ${port}...`);
});

process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  process.exit(1);
});

process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

process.on("SIGINT", () => {
  console.log(`Process ${process.pid} has been interrupted`);
  process.exit(0);
});

process.on("SIGTERM", () => {
  console.log("👋 SIGTERM RECEIVED. Shutting down gracefully");
  server.close(() => {
    console.log("💥 Process terminated!");
    process.exit(0);
  });
});
