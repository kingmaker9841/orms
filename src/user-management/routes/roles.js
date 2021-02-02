const router = require("express").Router();
const auth = require("../../config/auth");
const logger = require("../../config/logger");
const { canDelete, ROLE } = require("../../config/delete");
const { auditData } = require("../../config/audit");
const {
  Role,
  RoleControl,
  RoleType,
  DeleteLog,
  RoleChange
} = require("../../config/database");
const _ = require("lodash");

router.get("/roles", auth.required, (req, res, next) => {
  Role.findAll({
    where: { isDeleted: false }
  })
    .then(roles => {
      res.send(roles);
    })
    .catch(err => {
      console.log(err);
      res.send({ success: false, message: "Error! Roles" });
    });
});

router.get("/roles/types", auth.required, (req, res, next) => {
  RoleType.findAll()
    .then(roleTypes => {
      res.send(roleTypes);
    })
    .catch(err => {
      logger.error(err);
      res.status(500).send("Error!");
    });
});

router.post("/roles", auth.required, (req, res, next) => {
  const role = req.body;
  Role.create(role)
    .then(_ => {
      res.send({ success: true, message: "Role successfully created!" });
    })
    .catch(err => {
      console.log(err);
      res.send({ success: false, message: "Error!" });
    });
});

router.put("/roles/:id", auth.required, (req, res, next) => {
  var role = req.body;
  console.log("role ", req.body);
  const roleControls = req.body.role_controls;
  Promise.all([
    Role.update(role, { where: { id: role.id } }),
    //AUDIT LOG STARTS HERE
    auditData(Role, role, req.payload),
    //AUDIT LOGS ENDS HERE

    roleControls.map(r => {
      if (r.id) {
        return RoleControl.update(
          { ...r, editedBy: req.body.editedBy },
          { where: { id: r.id } }
        );
      } else {
        return RoleControl.create({ ...r, createdBy: req.body.createdBy });
      }
    })
  ])
    .then(count => {
      res.send({ success: true, message: "Role successfully updated!" });
    })
    .catch(err => {
      console.log(err);
      res.send({ success: false, message: "Error!" });
    });
});

router.get("/roles/:id", auth.required, (req, res, next) => {
  Role.hasMany(RoleControl);
  Role.findOne({
    include: [
      {
        model: RoleControl,
        required: false
      }
    ],
    where: { id: req.params.id, isDeleted: false }
  })
    .then(location => {
      res.send({ success: true, data: location });
    })
    .catch(err => {
      console.log(err);
      res.send({ success: false, message: "Error! Role Single" });
    });
});

router.delete("/roles/:id", auth.required, (req, res, next) => {
  Role.update(
    {
      isDeleted: true
    },
    {
      where: { id: req.params.id }
    }
  )
    .then(_ => {
      res.send("Successful!");
    })
    .catch(err => {
      logger.error(err);
      res.status(500).send("Error!");
    });
});

module.exports = router;
