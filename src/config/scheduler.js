const schedule = require("node-schedule");
const sendEmail = require("../misc/routes/email");
//" 00 00 00 * * *"
const jobCheckExpiredDocuments = schedule.scheduleJob(
  "* * 12 10 0", // "second(optional) minute hour day month week(0 or 7 for sunday)"
  function (fireDate) {
    sendEmail("ALERT");
  }
);

