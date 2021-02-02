const router = require("express").Router();
const auth = require("../../config/audit");
const { AuditLog } = require("../../config/database");
const _ = require("lodash");

router.get("/audit-log", (req, res, next) => {
  AuditLog.findAll({ attributes: ["tableName"] })
    .then(data => {
      const result = _(data)
        .groupBy("tableName")
        .map((items, tableName) => ({ tableName, count: items.length }))
        .value();
      res.status(200).send(result);
    
    })
    .catch(ex => res.status(400).send("Error !"));
});

module.exports = router;
