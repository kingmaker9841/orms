const router = require("express").Router();
const auth = require("../../config/auth");
const {
  RiskAreaParent,
  RiskArea,
  DeleteLog,
} = require("../../config/database");
const logger = require("../../config/logger");

router.get("/risk-area-parent", auth.required, (req, res, next) => {
  RiskAreaParent.hasMany(RiskArea);
  RiskAreaParent.findAll({
    where: { isDeleted: false },
    include: [
      {
        model: RiskArea,
        attributes: ["id", "name", "code"],
        required: false,
      },
    ],
  })
    .then((riskAreaParents) => {
      res.send(riskAreaParents);
    })
    .catch((err) => {
      logger.error(err);
      res.status(500).send();
    });
});

router.post("/risk-area-parent", auth.required, (req, res, next) => {
  const riskAreaParent = req.body;
  RiskAreaParent.create(riskAreaParent)
    .then((_) => {
      res.send();
    })
    .catch((err) => {
      logger.error(err);
      res.status(500).send();
    });
});

router.put("/risk-area-parent/:id", auth.required, (req, res, next) => {
  const riskAreaParent = req.body;
  RiskAreaParent.update(riskAreaParent, { where: { id: riskAreaParent.id } })
    .then((_) => {
      res.send();
    })
    .catch((err) => {
      logger.error(err);
      res.status(500).send();
    });
});

router.get("/risk-area-parent/:id", auth.required, (req, res, next) => {
  RiskAreaParent.findOne({
    where: { id: req.params.id, isDeleted: false },
    raw: true,
  })
    .then((riskAreaParent) => {
      res.send(riskAreaParent);
    })
    .catch((err) => {
      logger.error(err);
      res.status(500).send();
    });
});

router.delete("/risk-area-parent/:id", auth.required, (req, res, next) => {
  RiskAreaParent.update({ isDeleted: true }, { where: { id: req.params.id } })
    .then((data) => {
      DeleteLog.create({
        deletedItemId: req.params.id,
        deletedItemType: "riskAreaParent",
        deletedOn: new Date(),
        deletedBy: req.payload.email,
        deletedById: req.payload.id,
      })
        .then((_) => {
          res.send({ success: true, data: data });
        })
        .catch((err) => {
          console.log(err);
          res.send({ success: false, message: "Server Error" });
        });
    })
    .catch((err) => {
      logger.error(err);
      res.status(500).send();
    });
});

module.exports = router;
