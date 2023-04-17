const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

exports.connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("Connected Successfully ✅✅");
  } catch (err) {
    console.log(err);
  }
};

mongoose.connection.on("error", (err) => {
  console.error(err);
});
