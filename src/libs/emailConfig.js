const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  service: "gmail",
  auth: {
    user: "rcservice.web.control@gmail.com",
    pass: "gksy lsow zqtf mqkv",
  },
});

module.exports = {
  transporter: transporter,
};
