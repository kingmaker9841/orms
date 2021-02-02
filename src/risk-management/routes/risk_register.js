const router = require('express').Router();
const auth = require('../../config/auth');
const logger = require('../../config/logger');
const { auditData } = require('../../config/audit');
const Op = require('sequelize').Op;
const _ = require('lodash');

const { updateRegisters, getOptions } = require('../util/risk_register');
const {
  RiskAreaParticular,
  RiskAreaTrigger,
  RiskAreaTracedBy,
  RiskRegister,
  RiskArea,
  User,
  Role,
} = require('../../config/database');

router.get(
  '/risk-register-data/:riskAreaCode',
  auth.required,
  async (req, res, next) => {
    const riskAreaCode = req.params.riskAreaCode;
    const riskArea = await RiskArea.findOne({
      where: { code: riskAreaCode, isActive: true, isDeleted: false },
      order: [['createdAt', 'DESC']],
    });
    if (riskArea) {
      const riskAreaId = riskArea.id;
      Promise.all([
        RiskAreaParticular.findAll({
          attributes: ['code', 'name', 'baseUnitId'],
          where: { isDeleted: false, riskAreaId: riskAreaId },
        }),
        RiskAreaTrigger.findAll({
          attributes: ['id', 'name'],
          where: { isDeleted: false, riskAreaId: riskAreaId },
        }),
        RiskAreaTracedBy.findAll({
          attributes: ['id', 'name'],
          where: { isDeleted: false, riskAreaId: riskAreaId },
        }),
      ])
        .then(([particulars, triggers, tracedBy]) => {
          res.send({
            riskParticulars: particulars,
            riskTriggers: triggers,
            riskTracedBy: tracedBy,
          });
        })
        .catch((err) => {
          logger.error(err);
          res.status(500).send('Error!');
        });
    } else {
      res.status(404).send('Data not found!');
    }
  }
);

router.get(
  '/risk-register/:riskAreaCode',
  auth.required,
  async (req, res, next) => {
    const options = await getOptions(req.payload);
    const branchId = req.query.branchId
      ? req.query.branchId
      : req.payload.branchId;
    RiskRegister.findAll({
      where: {
        riskAreaCode: req.params.riskAreaCode,
        ...options,
        status: {
          [Op.and]: {
            ...(options.status
              ? {
                  [Op.eq]: options.status,
                }
              : {}),
            [Op.not]: 'Deleted',
          },
        },
        branchId: branchId,
      },
      order: [['createdAt', 'DESC']],
    })
      .then((riskRegisters) => {
        res.send(riskRegisters);
      })
      .catch((err) => {
        logger.error(err);
        res.status(500).send('Error!');
      });
  }
);

router.post('/risk-register', auth.required, async (req, res, next) => {
  var data = req.body;
  User.hasMany(Role, { sourceKey: 'roleId', foreignKey: 'id' });
  Role.belongsTo(User, { sourceKey: 'roleId', foreignKey: 'id' });
  const findUser = await User.findOne({
    attributes : ['roleId'],
    where : {
      id : req.body.createdBy
    }
  });
  const findRole = await Role.findOne({
    attributes : ['isMaker', 'isChecker', 'isApprover'],
    where : {
      id : JSON.parse(JSON.stringify(findUser)).roleId
    }
  })
  const roleObject = JSON.parse(JSON.stringify(findRole));
  console.log("roleObject.isChecker", roleObject.isChecker);
  if (roleObject.isChecker){
    RiskRegister.create({ ...data, status: 'Pending', branchId: req.payload.branchId })
    .then((_) => {
      res.send('Success!');
    })
    .catch((err) => {
      logger.error(err);
      res.status(500).send('Error!');
    });
  }else {
    RiskRegister.create({ ...data, branchId: req.payload.branchId })
    .then((_) => {
      res.send('Success!');
    })
    .catch((err) => {
      logger.error(err);
      res.status(500).send('Error!');
    });
  }
});

router.put('/risk-register/:id', auth.required, async (req, res, next) => {
  auditData(RiskRegister, req.body, req.payload);
  RiskRegister.update(req.body, {
    where: { id: req.params.id },
  })
    .then((_) => {
      res.send('Success!');
    })
    .catch((err) => {
      logger.error(err);
      res.status(500).send('Error!');
    });
});

router.post('/risk-register/:action', auth.required, (req, res, next) => {
  const action = req.params.action;
  const riskRegisters = req.body.riskRegisters;
  const userDetail = req.payload;
  updateRegisters(riskRegisters, action, userDetail)
    .then((_) => {
      res.send('Completed!');
    })
    .catch((err) => {
      logger.error(err);
      res.status(500).send('Error!');
    });
});

module.exports = router;
