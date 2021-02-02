const router = require("express").Router();
const auth = require("../../config/auth");
const logger = require("../../config/logger");
const {auditData}=require("../../config/audit")
const {
  RiskArea,
  RiskEstimation,
  RiskEstimationChange
} = require("../../config/database");

router.get("/risk-estimation/:branchId", auth.required, (req, res, next) => {
  const branchId = Number(req.params.branchId)
    ? req.params.branchId
    : req.payload.branchId;

  RiskArea.hasOne(RiskEstimation);
  RiskArea.findAll({
    where: { isDeleted: false, isActive: true },
    include: [
      {
        model: RiskEstimation,
        where: { branchId: branchId },
        required: false
      }
    ]
  })
    .then(riskAreasEstimation => {
      res.send(riskAreasEstimation);
    })
    .catch(err => {
      logger.error(err);
      res.status(500).send(err);
    });
});

router.put("/risk-estimation/:branchId", auth.required, (req, res, next) => {
  const branchId = Number(req.params.branchId)
    ? req.params.branchId
    : req.payload.branchId;
  const riskAreas = req.body;
  const userId = req.payload.id;

  Promise.all(
    riskAreas.map(riskArea => {
      var riskEstimation = riskArea.risk_estimation;
      if (riskEstimation) {

        if (riskEstimation.id) {
          auditData(RiskEstimation,riskEstimation,req.payload)
          return RiskEstimation.update(
            {
              ...riskEstimation,
              editedBy: userId
            },
            {
              where: { id: riskEstimation.id }
            }
          );
        } else {
          return RiskEstimation.create({
            ...riskEstimation,
            branchId: branchId,
            createdBy: userId
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
