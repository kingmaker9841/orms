const router = require('express').Router();
const auth = require('../../config/auth');
const { getHoSummary } = require('../util/ho_summary');
const logger = require('../../config/logger');

router.get("/ho-summary", auth.required, async (req, res, next) => {
    /**
     * 
     * @param {Object} options
     * @param {Number} options.frequency  - QUARTERLY, HALF_YEARLY, YEARLY (in months)
     * @param {String} options.status     - DRAFT, PENDING, UNAPPROVED, APPROVED (Risk Register status)
     * @param {Date}   options.startDate  - Base date to calculate the report Data
     * 
     */
    const options = req.query;
    getHoSummary(options).then(data => {
        res.send(data);
    }).catch(err => {
        logger.error(err);
    });
});

module.exports = router;