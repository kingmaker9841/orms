const router = require('express').Router();
const auth = require('../../config/auth');
const logger = require('../../config/logger');
const { getLetter } = require('../util/commitment_letter');

router.get('/commitment-letter', auth.required, (req, res, next) => {
    console.log("Commitment Letter api");
    getLetter(req.query, req.payload).then(filePath => {
        if (filePath) {
            res.send(filePath);
        } else {
            res.status(500).send("Error!");
        }
    }).catch(err => {
        logger.error(err);
        res.status(500).send("Error!");
    });
});

module.exports = router; 