const router = require('express').Router();
const auth = require('../../config/auth');
const logger = require('../../config/logger');
const { ReportDownload } = require('../../config/database');

router.get("/report-outputs", auth.required, (req, res, next) => {
    ReportDownload.findAll({
        where: {
            type: req.query.type,
        },
        orderby: [['createdAt', 'DESC']]
    }).then(reports => {
        res.send(reports);
    }).catch(err => {
        logger(err);
    });
});

module.exports = router;