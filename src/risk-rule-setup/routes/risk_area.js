const router = require("express").Router();
const auth = require("../../config/auth");
const logger = require("../../config/logger");
const _ = require("lodash");
const { auditData } = require("../../config/audit");
const {
  updateRiskParticulars,
  updateRiskTriggers,
  updateRiskTracedBy,
  updateRiskInstanceRules,
} = require("../util/risk_area");
const {
  RiskArea,
  RiskAreaParent,
  RiskAreaParticular,
  RiskAreaTrigger,
  RiskAreaTracedBy,
  RiskAreaLikelihoodRule,
  RiskAreaImpactRule,
  RiskAreaInstanceRule,
  LossDatabaseCategories,
} = require("../../config/database");

router.get("/risk-areas", auth.required, (req, res, next) => {
  const { riskAreaParentId } = req.query;
  RiskArea.belongsTo(RiskAreaParent);
  RiskArea.findAll({
    where: {
      isDeleted: false,
      ...(riskAreaParentId ? { riskAreaParentId } : {}),
    },
    include: [
      {
        model: RiskAreaParent,
        attributes: ["name"],
        required: true,
      },
    ],
    order: [["code", "ASC"]],
  }).then((riskAreas) => res.send(riskAreas));
});

router.get("/risk-areas/code", auth.required, (req, res, next) => {
  RiskArea.hasMany(RiskAreaParticular);
  RiskArea.findAll({
    where: { isDeleted: false, isActive: true },
    include: [
      {
        model: RiskAreaParticular,
        where: { isDeleted: false },
        required: false,
      },
    ],
  })
    .then((riskAreaCodes) => {
      res.send(riskAreaCodes);
    })
    .catch((err) => {
      logger.error(err);
      res.status(500).send("Error!");
    });
});

router.get("/risk-areas/:id", auth.required, (req, res, next) => {
  RiskArea.hasMany(RiskAreaParticular);
  RiskArea.hasMany(RiskAreaTrigger);
  RiskArea.hasMany(RiskAreaTracedBy);
  RiskArea.hasMany(RiskAreaInstanceRule);

  RiskAreaParticular.hasMany(RiskAreaLikelihoodRule);
  RiskAreaParticular.hasMany(RiskAreaImpactRule);

  RiskAreaTrigger.hasMany(LossDatabaseCategories, {sourceKey: 'lossDatabaseCategoryId', foreignKey: 'id'});

  RiskArea.findOne({
    include: [
      {
        model: RiskAreaParticular,
        include: [RiskAreaLikelihoodRule, RiskAreaImpactRule],
        where: { isDeleted: false },
        required: false,
      },
      {
        model: RiskAreaTrigger,
        include: [LossDatabaseCategories],
        where: { isDeleted: false },
        required: false,
      },
      {
        model: RiskAreaTracedBy,
        where: { isDeleted: false },
        required: false,
      },
      {
        model: RiskAreaInstanceRule,
        where: { isDeleted: false },
        required: false,
      },
    ],
    where: {
      id: req.params.id,
    },
  })
    .then((riskArea) => {
      res.send(riskArea);
    })
    .catch((err) => {
      logger.error(err);
      res.status(500).send("Error!");
    });
});

router.post("/risk-areas", auth.required, (req, res, next) => {
  RiskArea.create({
    ...req.body,
    createdBy: req.payload.id,
  })
    .then((_) => {
      res.send({ success: true, message: "Risk area successfully created!" });
    })
    .catch((err) => {
      console.log(err);
      res.send({ success: false, message: "Error!" });
    });
});

router.put("/risk-areas/code", auth.required, (req, res, next) => {
  const riskAreas = req.body;
  Promise.all(
    riskAreas.map((rA) => {
      return Promise.all(
        rA.risk_area_particulars.map((rP) => {
          auditData(RiskAreaParticular, rP, req.payload);

          return RiskAreaParticular.update(
            { code: rP.code },
            { where: { id: rP.id } }
          );
        })
      );
    })
  )
    .then((_) => {
      res.send(true);
    })
    .catch((err) => {
      logger.error(err);
      res.status(500).send("Error!");
    });
});

router.put("/risk-areas/:id", auth.required, async (req, res, next) => {
  let people, process, system, external;
  const lossDataCat = await LossDatabaseCategories.findAll({ 
    attributes: ['id', 'name'] ,
    raw: true
  })
  let allData = req.body;
  lossDataCat.map((lossCat, idx)=> {
    if (lossCat.name === 'People'){
      people = lossCat.id;
    }else if (lossCat.name === 'Process'){
      process = lossCat.id
    }else if (lossCat.name === 'System'){
      system = lossCat.id;
    }else if (lossCat.name === 'External'){
      external = lossCat.id
    }
  });
  allData.risk_area_triggers.map((item,idx)=> {
      if (item['lossData'] === 'people'){
          item['lossDatabaseCategoryId'] = people;
          delete item['lossData'];
      }else if (item['lossData'] === 'process'){
          item['lossDatabaseCategoryId'] = process;
          delete item['lossData'];
      }else if (item['lossData'] === 'system'){
          item['lossDatabaseCategoryId'] = system;
          delete item['lossData'];
      }else if (item['lossData'] === 'external'){
          item['lossDatabaseCategoryId'] = external
          delete item['lossData'];
      }
  });
  Promise.all([
    auditData(RiskArea, req.body, req.payload),
    RiskArea.update(req.body, { where: { id: req.body.id } }),

    auditData(RiskAreaParticular, req.body, req.payload),
    updateRiskParticulars(
      req.body.risk_area_particulars,
      req.payload.id,
      req.body.id
    ),
    auditData(RiskAreaTrigger, req.body, req.payload),
    updateRiskTriggers(
      req.body.risk_area_triggers,
      req.payload.id,
      req.body.id
    ),
    auditData(RiskAreaTracedBy, req.body, req.payload),
    updateRiskTracedBy(
      req.body.risk_area_traced_bies,
      req.payload.id,
      req.body.id
    ),
    auditData(RiskAreaLikelihoodRule, req.body, req.payload),
    updateRiskInstanceRules(
      req.body.risk_area_likelihood_instance_rules,
      req.payload.id,
      req.body.id
    ),
  ])
    .then((_) => {
      res.send(true);
    })
    .catch((err) => {
      logger.error(err);
      res.status(500).send("Error!");
    });
});

router.delete("/risk-areas/:id", auth.required, (req, res, next) => {
  RiskArea.update(
    {
      isDeleted: true,
      editedBy: req.payload.id,
    },
    {
      where: { id: req.params.id },
    }
  )
    .then((_) => {
      res.send("Successful!");
    })
    .catch((err) => {
      logger.error(err);
      res.status(500).send("Error!");
    });
});

module.exports = router;
