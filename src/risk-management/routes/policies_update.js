const router = require("express").Router();
const auth = require("../../config/auth");
const {
  PolicyUpdate,
  RiskArea,
  RiskEstimationHO
} = require("../../config/database");
const { auditData } = require("../../config/audit");
const logger = require('../../config/logger')

router.get("/policies-update", auth.required, (req, res, next) => {
  RiskArea.hasOne(PolicyUpdate);
  RiskArea.hasOne(RiskEstimationHO);
  RiskArea.findAll({
    where: { isDeleted: false, isActive: true },
    include: [
      {
        model: PolicyUpdate,
        required: false,
      },
      {
        model: RiskEstimationHO,
        required: false,
      }
    ]
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      logger.error(err);
      res.status(500).send(err);
    });
});

router.put("/policies-update", auth.required, (req, res, next) => {
  var riskAreas = req.body;
  // console.log(riskAreas)
  const userId = req.payload.userId;
  Promise.all(
    riskAreas.map(riskArea => {
      var policies = riskArea.policy;
      if (policies) {
        //starts from here
        if (policies.id) {
          auditData(PolicyUpdate, policies, req.payload);
          return PolicyUpdate.update(
            {
              ...policies,
              editedBy: userId,
              branchId: req.payload.branchId
            },
            {
              where: { id: policies.id }
            }
          );
        } else {
          return PolicyUpdate.create({
            ...policies,
            createdBy: userId,
            branchId: req.payload.branchId
          });
        }
      }
      return;
    })
  )
    .then(_ => {
      res.send("Success!");
    })
    .catch(err => {
      logger.error(err);
      res.status(500).send("Error!");
    });
});

module.exports = router;
