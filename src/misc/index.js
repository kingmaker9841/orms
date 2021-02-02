const router = require('express').Router();

router.use(require('./routes/authorize'));
router.use(require('./routes/get_all'));
router.use(require('./routes/audit-logs'))
router.use(require('./routes/mailing_days'))
router.use(require('./routes/mail_logs'))
module.exports = router;