const express = require("express");
const auth = require("../../config/auth");

const { MailingDays } = require("../../config/database");
const router = express.Router();

router.get("/mailing-date", auth.required, async (req, res, next) => {
  MailingDays.findOne({ where: { id: 1 } })
    .then(data => res.status(200).send(data))
    .catch(ex => res.status(404).send("Error"));
});
router.put("/mailing-date", auth.required, async (req, res, next) => {
  let mailingDays = req.body;
  mailingDays.id = 1;
  let length = "";
  await MailingDays.findAll({}).then(data => {
    return (length = data.length);
  });

  if (length > 0) {
    await MailingDays.update({ ...req.body }, { where: { id: 1 } })
      .then(s => res.status(200).send("success"))
      .catch(ex => res.status(200).send("cant update the table", ex));
  } else {
    await MailingDays.create({ ...mailingDays })
      .then(s => res.status(200).send("Successful creation"))
      .catch(ex => res.status(400).send("we got some exception", ex));
  }
});
module.exports = router;
