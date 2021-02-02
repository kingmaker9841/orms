const router = require("express").Router();
const auth = require("../../config/auth");
const logger = require("../../config/logger");
const { auditData } = require("../../config/audit");

const {
  RiskCategorization,
  RiskEscalationFunction,
  RiskEscalationChange,
  RiskCategorizationChange
} = require("../../config/database");

router.get("/risk-categorization", auth.required, (req, res) => {
  RiskCategorization.findAll({
    where: { isDeleted: false },
    order: [["lowerLimit", "DESC"]]
  })
    .then(riskCategories => {
      res.send(riskCategories);
    })
    .catch(err => {
      logger.error(err);
      res.status(500).send("Error!");
    });
});

router.put("/risk-categorization", auth.required, async (req, res) => {
  const riskCategories = req.body.riskCategories;
  await RiskCategorization.update(
    { isDeleted: true },
    { where: { isDeleted: false } }
  );
  Promise.all(
    riskCategories.map(r => {
      if (r.id) {
        auditData(RiskCategorization, r, req.payload);

        return RiskCategorization.update(
          { ...r, isDeleted: false, editedBy: req.payload.id },
          { where: { id: r.id } }
        );
      } else {
        return RiskCategorization.create({ ...r, createdBy: req.payload.id });
      }
    })
  )
    .then(_ => {
      res.send("Successful!");
    })
    .catch(err => {
      logger.error(err);
      res.status(500).send("Error!");
    });
});

router.get("/risk-escalation", auth.required, async (req, res) => {
  RiskCategorization.hasMany(RiskEscalationFunction);

  RiskCategorization.findAll({
    where: { isDeleted: false },
    attributes: ["id", "name"],
    order: [["lowerLimit", "DESC"]],
    include: [
      {
        model: RiskEscalationFunction
      }
    ]
  })
    .then(riskCategories => {
      res.send(riskCategories);
    })
    .catch(err => {
      logger.error(err);
      res.status(500).send("Error!");
    });
});

router.put("/risk-escalation", auth.required, (req, res) => {
  const riskCategories = req.body.riskCategories;
  Promise.all(
    riskCategories.map(rC => {
      return Promise.all(
        rC.risk_escalation_functions.map(rE => {
          if (rE.id) {
            auditData(RiskEscalationFunction, rE, req.payload);
            return RiskEscalationFunction.update(
              { ...rE, editedBy: req.payload.id },
              { where: { id: rE.id } }
            );
          } else {
            return RiskEscalationFunction.create({
              ...rE,
              createdBy: req.payload.id
            });
          }
        })
      );
    })
  )
    .then(_ => {
      res.send("Successful!");
    })
    .catch(err => {
      logger.error(err);
      res.status(500).send("Error!");
    });
});

module.exports = router;
