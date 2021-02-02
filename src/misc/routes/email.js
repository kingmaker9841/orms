const axios = require("axios");
const alertEmail = require("./alert_email");
const logger = require("../../config/logger");

const sendEmail = (type) => {
  try {
    switch (type) {
      case "ALERT":
        alertEmail();
        break;
      default:
        break;
    }
  } catch (err) {
    logger.error(err);
    res.status(500).send("Error!!");
  }
};

module.exports = sendEmail;
