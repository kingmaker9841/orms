/**
 * @module UserManagement
 */
const router = require('express').Router();

router.use(require('./routes/users'));
router.use(require('./routes/roles'));
router.use(require('./routes/branches'));
router.use(require('./routes/departments'));

module.exports = router;