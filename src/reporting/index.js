/**
 * @module Reporting
 */
const router = require("express").Router();

router.use("/report", require("./routes/branch_summary"));
router.use("/report", require("./routes/branch_categorization"));
router.use("/report", require("./routes/report_outputs"));
router.use("/report", require("./routes/commitment_letter"));
router.use("/report", require("./routes/ho_summary"));
router.use("/report", require("./routes/risk_trigger"));
router.use(require("./routes/form_report"));

router.use(require("./routes/dashboard"));

module.exports = router;
