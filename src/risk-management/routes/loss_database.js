const router = require('express').Router();
const auth = require('../../config/auth');
const { getBranch } = require('../../user-management/util/branches'); //Get BranchName with Id
const {
  RiskRegister,
  LossDatabaseCategories,
  RiskAreaTrigger,
} = require('../../config/database');
const { Op } = require('sequelize');
const { updateLossDatabase, getLossDataCatId } = require('../util/risk_register');

router.get('/loss-database', async (req, res) => {
  //Get branch Id
  const { branchId, generatedLossData } = req.query;
  const generatedRisks = await RiskRegister.findAll({
    attributes: [
      'id',
      'isLossDatabaseGenerated',
      'branchId',
      'transactionDate',
      'tracedDate',
      'riskAreaParticular',
      'relatedStaff',
      'riskAreaCode',
      'riskAreaParticularCode',
      'amountTiming',
      'financialImpact',
      'mitigationAction',
      'occurrence',
      'remarks',
    ],
    where: {
      branchId: Number(branchId),
      status: 'Approved',
      isLossDatabaseGenerated: generatedLossData,
      financialImpact: {
        [Op.gt]: 0,
      },
    },
  });
  // console.log(generatedRisks.length);
  res.status(200).send(generatedRisks);
});

router.get('/loss-database-risk-cause', async (req, res) => {
  const { branchId, generatedLossData, riskCause } = req.query;
  const riskCauseCategory = {
    people: [
      'EL11',
      'EL12',
      'EL31',
      'EL41',
      'EL44',
      'EL45',
      'RA03',
      'EL73',
      'EL74',
    ],
    process: ['EL32', 'EL33', 'EL42', 'RA01', 'EL71', 'EL72'],
    system: ['EL22', 'EL43', 'RA11', 'RA26', 'EL61'],
    external: ['EL21', 'EL51', 'EL75', 'EL76'],
  };
  const generatedRisks = await RiskRegister.findAll({
    attributes: [
      'id',
      'isLossDatabaseGenerated',
      'branchId',
      'transactionDate',
      'tracedDate',
      'riskAreaParticular',
      'relatedStaff',
      'riskAreaCode',
      'riskAreaParticularCode',
      'amountTiming',
      'financialImpact',
      'mitigationAction',
      'occurrence',
      'remarks',
    ],
    where: {
      branchId: Number(branchId),
      status: 'Approved',
      isLossDatabaseGenerated: generatedLossData,
      financialImpact: {
        [Op.gt]: 0,
      },
      riskAreaCode: {
        [Op.in]: riskCauseCategory[`${riskCause}`],
      },
    },
  });
  // console.log("generated Risks", generatedRisks.length);
  res.status(200).send(generatedRisks);
});

router.post('/loss-database/', async (req, res) => {
  const { lossData } = req.body;
  updateLossDatabase(lossData)
    .then((_) => {
      res.send('Completed!');
    })
    .catch((err) => {
      logger.error(err);
      res.status(500).send('Error!');
    });
});

router.get('/loss-database-category', auth.required, async (req, res) => {
  const { id } = req.query;
  const lossData = await LossDatabaseCategories.findOne({
    attributes: ['name'],
    where: {
      id,
    },
  });
  res.status(200).send(lossData);
});

router.get('/loss-data-trigger',  async (req, res) => {
  const { branchId, generatedLossData } = req.query;
  let {riskCause} = req.query;
  riskCause = riskCause.toLowerCase();
  let riskId = getLossDataCatId(riskCause);
  RiskRegister.hasMany(RiskAreaTrigger, {sourceKey: 'riskTrigger', foreignKey: 'name'});
  const generatedRisks = await RiskRegister.findAll({
    attributes: [
      'id',
      'isLossDatabaseGenerated',
      'branchId',
      'transactionDate',
      'tracedDate',
      'riskAreaParticular',
      'relatedStaff',
      'riskAreaCode',
      'riskAreaParticularCode',
      'amountTiming',
      'financialImpact',
      'mitigationAction',
      'occurrence',
      'remarks',
    ],
    where: {
      branchId: Number(branchId),
      status: 'Approved',
      isLossDatabaseGenerated: generatedLossData,
      financialImpact: {
        [Op.gt]: 0,
      },
      // riskTrigger : {
      //   [Op.like] : `$riskTriggers.name$`
      // }
    },
    include: [
      {
        model: RiskAreaTrigger,
        attributes: ['lossDatabaseCategoryId'],
        where: {
          lossDatabaseCategoryId: riskId
        },
        required: true
      }
    ],
    raw: true
  });
  console.log(generatedRisks.length);
  res.status(200).send(generatedRisks)
});

module.exports = router;
