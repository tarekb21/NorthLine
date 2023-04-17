const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv();

exports.sendMail = async (options) => {
  // 1 - create a transporter instance
  const transporter = nodemailer.createTransport({
    service: "SendGrid",
    auth: {
      user: process.env.SENDGRID_USERNAME,
      pass: process.env.SENDGRID_PASSWORD,
    },
  });

  // 2- Define the email options
  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  // 3 - send the mail

  await transporter.sendMail(mailOptions);
};
