const router = require("express").Router();
const auth = require("../../config/auth");
const { MailingLogs } = require("../../config/database");
const logger = require("../../config/logger");

router.get("/mail-log", auth.required, async (req, res, next) => {
  MailingLogs.findAll({ order: [['seen', 'ASC']], })
    .then(d => {
      res.status(200).send(d);
    })
    .catch(err => {
      logger.error(err)
      res.status(500).send("Something went wrong!");
    });
});

router.put("/mail-log/:id", auth.required, async (req, res, next) => {
  MailingLogs.update({ ...req.body }, { where: { id: req.params.id } })
    .then(data => res.status(200).send("Success !"))
    .catch(ex => {
      logger.error(ex);
      res.status(500).send("Something failed!");
    });
});
module.exports = router;
