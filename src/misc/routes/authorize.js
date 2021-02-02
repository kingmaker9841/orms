const router = require('express').Router();
const auth = require('../../config/auth');
const logger = require('../../config/logger');
const { Role, RoleControl, RoleType } = require('../../config/database');
// const { getPermissions } = require('../../user-management/util/role');
// const { ProvinceBranch, User } = require('../../config/database');
// const province = require('../../user-management/models/province');

router.get("/isLoggedIn", auth.required, (req, res, next) => {
    res.send(true);
});

router.get('/permissions', auth.required, (req, res, next) => {
    const roleId = req.payload.roleId;
    Role.hasMany(RoleControl);
    RoleControl.belongsTo(RoleType)

    Role.findOne({
        include: [
            {
                model: RoleControl,
                required: false,
                include: [
                    {
                        model: RoleType,
                    }
                ],
            }
        ],
        where: {
            id: roleId,
        },
    }).then(role => {
        const permissions = {
            isMaker: role.isMaker,
            isChecker: role.isChecker,
            isApprover: role.isApprover,
            isAdmin: role.isAdmin,
            isProvinceAdmin: role.isProvinceAdmin
        }
        role.role_controls.forEach(rC => {
            permissions[rC.role_type.value] = rC.value;
        });
        res.send(permissions);
    }).catch(err => {
        logger.error(err);
        res.status(500).send("Error!");
    })
});

module.exports = router;