const express = require("express");
const router = express.Router();
const auth = require("../../config/auth");
const logger = require("../../config/logger");
const {
  RiskAreaTrigger,
  RiskRegister,
} = require("../../config/database");
const Op = require('sequelize').Op;

router.get("/risk-trigger", auth.required, (req, res, next) => {
  RiskAreaTrigger.findAll({
    attributes: ["name"],
    raw: true,
    group: ['name']
  })
    .then(data =>
      res.status(200).send(data))
    .catch(err => {
      logger.error(err);
      res.status(500).send("Error!");
    });
});

router.get("/risk-trigger/data", auth.required, (req, res, next) => {
  const options = req.query;
  RiskRegister.findAll({
    attributes: ['riskAreaParticular', 'relatedStaff', 'remarks'],
    where: {
      riskTrigger: options.riskTrigger,
      branchId: options.branchId ? options.branchId : req.payload.branchId,
      tracedDate: {
        [Op.gt]: new Date(options.startDate)
      }
    },
  }).then(riskRegisters => {
    res.send(riskRegisters);
  }).catch((err) => {
    logger.error(err);
    res.status(500).send("Error!");
  });
});

module.exports = router;
