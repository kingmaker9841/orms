const router = require('express').Router();
const auth = require('../../config/auth');
const logger = require('../../config/logger');
const { RiskArea, RiskRegister, Role } = require('../../config/database');
const sequelize = require('sequelize');
const Op = sequelize.Op;

router.get("/risk-register-all", auth.required, async (req, res, next) => {
    const branchId = req.query.branchId ? req.query.branchId : req.payload.branchId;
    const frequency = req.query.frequency ? req.query.frequency : 3;
    const status = req.query.status;
    const role = await Role.findOne({ where: { id: req.payload.roleId }, raw: true });
    const { isApprover, isMaker, isChecker } = role;
    const startDate = req.query.startDate ? req.query.startDate : new Date(Date.now() - 3 * 30 * 24 * 60 * 60 * 1000);
    const mainOptions = {
        branchId: branchId,
        status: status,
        tracedDate: {
            [Op.gte]: new Date(startDate),
            [Op.lte]: new Date(new Date(startDate).getTime() + Number(frequency) * 30 * 24 * 60 * 60 * 1000)
        },
    }

    if (Boolean(isApprover) && !req.query.branchId) {
        delete mainOptions.branchId;
    }

    if (isMaker) {
        mainOptions.createdBy = req.payload.id;
    }
    try {
        const data = {};
        RiskArea.hasMany(RiskRegister, { foreignKey: 'riskAreaCode', sourceKey: 'code' });
        data.functionWiseReports = await RiskArea.findAll({
            attributes: ['code'],
            where: {
                isDeleted: false, isActive: true
            },
            order: [['code', 'ASC']],
            raw: true,
            include: [
                {
                    model: RiskRegister,
                    attributes: [[sequelize.fn('count', sequelize.col('[risk_registers].[id]')), 'count']],
                    where: {
                        ...mainOptions
                    },
                    required: false,
                }
            ],
            group: ['risk_area.code'],
        });

        delete mainOptions.status;

        data.reportedInstances = await RiskRegister.findAll({
            attributes: ['status', [sequelize.fn('count', sequelize.col('id')), 'count']],
            where: {
                ...mainOptions
            },
            group: ['status'],
        });

        data.unrectifiedErrors = {};

        data.unrectifiedErrors.thisQuarter = await RiskRegister.findAll({
            attributes: [[sequelize.fn('count', sequelize.col('id')), 'count']],
            where: {
                ...mainOptions,
                ...isApprover ? {
                    status: {
                        [Op.and]: {
                            [Op.not]: 'Deleted',
                            // [Op.like]: 'Approved'
                        }
                    }
                } : {},
                rectificationDate: null,
            },
        });

        data.unrectifiedErrors.previousQuarter = await RiskRegister.findAll({
            attributes: [[sequelize.fn('count', sequelize.col('id')), 'count']],
            where: {
                ...mainOptions,
                tracedDate: {
                    [Op.gte]: new Date(new Date(startDate).getTime() - Number(frequency) * 30 * 24 * 60 * 60 * 1000),
                    [Op.lt]: new Date(startDate),
                },
                rectificationDate: null,
            },
        });
        res.status(200).send(data);
    } catch (err) {
        logger.error(err);
        res.status(500).send("Error!");
    };
});

module.exports = router;