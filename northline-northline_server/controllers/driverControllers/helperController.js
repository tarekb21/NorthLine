const bcrypt = require("bcrypt");
exports.mongooseErrorHandler = (err, res) => {
  try {
    if (!err) {
      return null;
    } else {
      let errorContent = Object.keys(err.errors);

      switch (true) {
        case errorContent.includes("email"):
          return res.status(400).json({
            message: "Please enter a valid email, example(johndoe@example.com)",
          });

        case errorContent.includes("fullname"):
          return res.status(400).json({
            message: "Please enter a fullname with minimum length of 2",
          });

        case errorContent.includes("phoneNumber"):
          return res.status(400).json({
            message: "Please enter a valid phone number, example(+96103123456)",
          });

        case errorContent.includes("password"):
          return res.status(400).json({
            message:
              "Please enter a valid password, with a minimum length of 8 characters",
          });

        case errorContent.includes("age"):
          return res.status(400).json({ message: "Please enter a valid age." });

        case errorContent.includes("gender"):
          return res.status(400).json({
            message: "Please choose a valid gender (male - female - other)",
          });

        case errorContent.includes("type"):
          return res.status(400).json({
            message: "Please choose a valid driver type (Taxi or Bus Driver)",
          });

        case errorContent.includes("address"):
          return res.status(400).json({
            message: "Please provide your address",
          });

        case errorContent.includes("drivingLicensePhoto"):
          return res.status(400).json({
            message: "Please provide a valid driving license photo",
          });
      }
    }
  } catch (err) {
    console.log(err);
  }
};

exports.checkPassword = async (candidatePassword, userPassword) => {
  return await bcrypt.compare(candidatePassword, userPassword);
};
