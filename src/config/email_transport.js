const nodemailer = require("nodemailer");
const { EMAIL } = require("./credentials");

module.exports.emailTransporter = nodemailer.createTransport({
    host: EMAIL.HOST,
    port: EMAIL.PORT,
    secure: EMAIL.SECURE,
    auth: {
      user: EMAIL.USERNAME, // generated ethereal user
      pass: EMAIL.PASSWORD, // generated ethereal password
    },
  });