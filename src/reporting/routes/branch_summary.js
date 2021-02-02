const router = require('express').Router();
const auth = require('../../config/auth');
const { Role } = require('../../config/database');
const logger = require('../../config/logger');
const {
    getBranchSummary,
    createBranchSummaryReport,
    saveBranchSummaryReport,
    getMakerBranchSummary
} = require('../util/branch_summary');

router.get("/branch-summary", auth.required, (req, res, next) => {
    const branchId = req.params.branchId;
    /**
     * @param {Object} options
     * @param {Number} options.branchId   - Branch ID whose report is to be calculated
     * @param {Number} options.frequency  - QUARTERLY, HALF_YEARLY, YEARLY (in months)
     * @param {String} options.status     - DRAFT, PENDING, UNAPPROVED, APPROVED (Risk Register status)
     * @param {String} options.mergeType  - avg, min, max (Merge Function Types)
     * @param {Date}   options.startDate    - Base date to calculate the report Data
     * 
     * 
     */
    const query = req.query;
    const options = {
        ...query,
        branchId: query.branchId ? query.branchId : req.payload.branchId,
    }
    getBranchSummary(options).then(data => {
        res.send(data);
    }).catch(err => {
        logger.error(err);
        res.status(500).send("Error!");
    });
});

router.get("/maker-branch-summary", auth.required, (req, res, next) => {
    const branchId = req.params.branchId;
    /**
     * @param {Object} options
     * @param {Number} options.branchId   - Branch ID whose report is to be calculated
     * @param {Number} options.frequency  - QUARTERLY, HALF_YEARLY, YEARLY (in months)
     * @param {String} options.status     - DRAFT, PENDING, UNAPPROVED, APPROVED (Risk Register status)
     * @param {String} options.mergeType  - avg, min, max (Merge Function Types)
     * @param {Date}   options.startDate    - Base date to calculate the report Data
     * 
     * 
     */
    const query = req.query;
    const options = {
        ...query,
        branchId: query.branchId ? query.branchId : req.payload.branchId,
        creatorId: req.payload.id
    }
    getMakerBranchSummary(options).then(data => {
        res.send(data);
    }).catch(err => {
        logger.error(err);
        res.status(500).send("Error!");
    });
});

router.post("/branch-summary/download", auth.required, async (req, res, next) => {
    /**
     * @param {Object} branchSummary - Branch Summary
     * @param {Object} riskAreas     - Risk Areas with registers
     * @param {Object} options     - Options to create branch Summary
     */
    req.body.options.branchId = req.body.options.branchId ? req.body.options.branchId : req.payload.branchId;
    const { isApprover } = await Role.findOne({ where: { id: req.payload.roleId }, raw: true });
    req.body.options.isApprover = isApprover;
    createBranchSummaryReport(req.body).then(data => {
        res.send(data);
    }).catch(err => {
        logger.error(err);
        res.status(500).send("Error!");
    });
});

router.post("/maker-branch-summary/download", auth.required, async (req, res, next) => {
    /**
     * @param {Object} branchSummary - Branch Summary
     * @param {Object} riskAreas     - Risk Areas with registers
     * @param {Object} options     - Options to create branch Summary
     */
    req.body.options.branchId = req.body.options.branchId ? req.body.options.branchId : req.payload.branchId;
    const { isApprover } = await Role.findOne({ where: { id: req.payload.roleId }, raw: true });
    req.body.options.isApprover = isApprover;
    createBranchSummaryReport(req.body).then(data => {
        res.send(data);
    }).catch(err => {
        logger.error(err);
        res.status(500).send("Error!");
    });
});

router.post("/branch-summary/save", auth.required, (req, res, next) => {
    /**
     * @param {Object} branchSummary - Branch Summary
     * @param {Object} options     - Options to create branch Summary
     */
    req.body.options.branchId = req.body.options.branchId ? req.body.options.branchId : req.payload.branchId;
    saveBranchSummaryReport(req.body, req.payload).then(data => {
        res.send(data);
    }).catch(err => {
        logger.error(err);
        res.status(500).send("Error!");
    });
});

module.exports = router;