const router = require('express').Router();
const auth = require('../../config/auth');
const logger = require('../../config/logger');
const { getBranchCategorization, createBranchCategorization, } = require('../util/branch_categorization');

router.get('/branch-categorization', auth.required, (req, res, next) => {
    /**
     * @param {String} startDate    - Start Quarter Date
     * @param {String} score        - actualScore, previousScore, estimatedScore
     * 
     */
    const query = req.query;
    const options = {
        ...query
    }
    getBranchCategorization(options).then(data => {
        // console.log("data", data.actual[0].categorizationArr);
        res.send(data);
    }).catch(err => {
        logger.error(err);
        res.status(500).send("Error!");
    });
});

router.post("/branch-categorization/download", auth.required, (req, res, next) => {
    createBranchCategorization(req.body).then(data => {
        res.send(data);
    }).catch(err => {
        logger.error(err);
        res.status(500).send("Error!");
    });
});

// router.post('/branch-categorization/save', auth.required, (req, res, next) => {
//     saveBranchCategorization(req.body).then(data => {
//         res.send(data);
//     }).catch(err => {
//         logger.error(err);
//         res.status(500).send("Error!");
//     });
// });

module.exports = router;