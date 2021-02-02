const router = require('express').Router();
const auth = require('../../config/auth');
const { Likelihood, Impact, BaseUnit } = require('../../config/database')

router.get('/likelihood-impact', auth.required, (req, res, next) => {
    Promise.all([
        Likelihood.findAll(),
        Impact.findAll(),
        BaseUnit.findAll(),
    ]).then(([likelihoods, impacts, baseUnits]) => {
        res.send({ likelihoods, impacts, baseUnits })
    }).catch(err => {
        res.status(500).send("Error!");
    });
});

module.exports = router;