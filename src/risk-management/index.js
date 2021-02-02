/**
 * @module RiskRegister
 */
const router = require("express").Router();

router.use(require("./routes/risk_escalation_categorization"));
router.use(require("./routes/risk_estimation_ho"));
router.use(require("./routes/risk_estimation"));
router.use(require("./routes/risk_register"));
router.use(require("./routes/policies_update"));
router.use(require("./routes/loss_database"));

module.exports = router;
