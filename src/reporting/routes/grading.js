const router = require('express').Router();
const auth = require('../../config/auth');
const logger = require('../../config/logger');
const { Grading } = require('../../config/database');

router.get("/grading", auth.required, (req, res, next) => {
    /**
     * @param {String} type      - branch, function as per the saved information
     * @param {String} startDate - Start date of the quarter
     */
    const options = req.query;
    Grading.findAll({
        type: this.options.type,
        startDate: new Date(options.startDate)
    }).then(grades => {
        res.send(grades);
    }).catch(err => {
        logger.error(err);
        res.status(500).send("Error!")
    })
});

router.post("/grading", auth.required, async (req, res, next) => {
    /**
     * @param {String} type      - branch, function as per the saved information
     * @param {String} startDate - Start date of the quarter
     */
    const body = req.body;
    const data = body.data;
    const count = await Grading.findAll({ where: { startDate: new Date(body.startDate), type: options.type } });
    if (count.length === 0) {
        Promise.all(
            data.map(d => {
                return Grading.create({
                    ...d,
                    createdBy: body.createdBy,
                    startDate: body.startDate,
                    type: body.type,
                });
            })
        ).then(_ => {
            res.send("Successful");
        }).catch(err => {
            logger.error(err);
            res.status(500).send("Error!")
        })
    } else {
        res.send("You cannot perform this action!");
    }

});

module.exports = router;