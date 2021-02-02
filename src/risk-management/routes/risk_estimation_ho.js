const router = require("express").Router();
const auth = require("../../config/auth");
const logger = require("../../config/logger");
const { auditData } = require("../../config/audit");
const {
  RiskArea,
  RiskEstimationHO,
  RiskEstimationHoChange
} = require("../../config/database");

router.get("/risk-estimation-ho", auth.required, (req, res, next) => {
  RiskArea.hasOne(RiskEstimationHO);
  RiskArea.findAll({
    where: { isDeleted: false, isActive: true },
    include: [
      {
        model: RiskEstimationHO,
        required: false
      }
    ]
  })
    .then(riskAreasHo => {
      res.send(riskAreasHo);
    })
    .catch(err => {
      logger.error(err);
      res.status(500).send(err);
    });
});

router.put("/risk-estimation-ho", auth.required, (req, res, next) => {
  var riskAreas = req.body;
  const userId = req.payload.userId;
  Promise.all(
    riskAreas.map(riskArea => {
      var riskEstimation = riskArea.risk_estimation_ho;
      if (riskEstimation) {
        //starts from here

        if (riskEstimation.id) {
          auditData(RiskEstimationHO, riskEstimation, req.payload);
          return RiskEstimationHO.update(
            {
              ...riskEstimation,
              editedBy: userId,
              branchId: req.payload.branchId
            },
            {
              where: { id: riskEstimation.id }
            }
          );
        } else {
          return RiskEstimationHO.create({
            ...riskEstimation,
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
