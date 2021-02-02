/**
 * @module RiskRuleSetup
 */
const router = require('express').Router();

router.use(require("./routes/risk_area"));
router.use(require("./routes/risk_area_parent"));
router.use(require("./routes/likelihood_impact"));

module.exports = router;
