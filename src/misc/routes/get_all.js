const router = require('express').Router();
const auth = require('../../config/auth');
const logger = require('../../config/logger');
const { getSortedDepartments } = require('../../user-management/util/department');
const { getBranches, getBranch } = require('../../user-management/util/branches');
const { Role, Department, RiskArea, BaseUnit, Province } = require('../../config/database');

router.get("/all", auth.required, (req, res, next) => {
    Promise.all([
        Role.findAll({ where: { isDeleted: false }, attributes: ['id', 'name'] }),
        getBranches(['id', 'name']),
        Department.findAll({ where: { isDeleted: false } }),
        RiskArea.findAll({ where: { isDeleted: false, isActive: true }, attributes: ['id', 'name', 'code'], order: [['code', 'ASC']] }),
        BaseUnit.findAll(),
        Province.findAll()
    ]).then(([
        roles,
        branches,
        departments,
        riskAreas,
        baseUnits,
        provinces
    ]) => {
        res.send({
            roles,
            branches,
            departments: getSortedDepartments(departments),
            riskAreas,
            baseUnits,
            provinces
        });
    }).catch(err => {
        logger.error(err);
        res.status(500).send("Error!");
    })
});

module.exports = router;