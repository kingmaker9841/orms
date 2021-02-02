const router = require('express').Router();
const auth = require('../../config/auth');
const { canDelete, DEPARTMENT } = require('../../config/delete');
const { Department, DeleteLog } = require('../../config/database');
const { auditData } = require('../../config/audit');
const { getSortedDepartments } = require('../util/department');

router.get("/departments", auth.required, (req, res, next) => {
  Department.findAll({
    where: { isDeleted: false }
  })
    .then(departments => {
      res.send(getSortedDepartments(departments));
    })
    .catch(err => {
      console.log(err);
      res.send({ success: false, message: "Error! Departments" });
    });
});

router.post("/departments", auth.required, (req, res, next) => {
  const department = req.body;
  Department.create(department)
    .then(_ => {
      res.send({ success: true, message: "Department successfully created!" });
    })
    .catch(err => {
      console.log(err);
      res.send({ success: false, message: "Error!" });
    });
});

router.put("/departments/:id", auth.required, (req, res, next) => {
    const department = req.body;
    // AUDIT TABLE FROM BELOW FUNCTION
    auditData(Department, department, req.payload);
    // AUDIT LOG END
    Department.update(department,
        { where: { id: department.id } }
    ).then(count => {
        res.send({ success: true, message: "Department successfully updated!" });
    }).catch(err => {
        console.log(err);
        res.send({ success: false, message: "Error!" });
    })
    .catch(err => {
      console.log(err);
      res.send({ success: false, message: "Error!" });
    });
});

router.get("/departments/:id", auth.required, (req, res, next) => {
  Department.findOne({
    where: { id: req.params.id, isDeleted: false },
    raw: true
  })
    .then(location => {
      res.send({ success: true, data: location });
    })
    .catch(err => {
      console.log(err);
      res.send({ success: false, message: "Error! Department Single" });
    });
});

router.delete("/departments", auth.required, (req, res, next) => {
  canDelete(DEPARTMENT, req.payload.id, canDelete => {
    if (canDelete) {
      Department.update({ isDeleted: true }, { where: { id: req.body.id } })
        .then(data => {
          DeleteLog.create({
            deletedItemId: req.body.id,
            deletedItemType: DEPARTMENT,
            deletedOn: new Date(),
            deletedBy: req.payload.email,
            deletedById: req.payload.id
          })
            .then(_ => {
              res.send({ success: true, data: data });
            })
            .catch(err => {
              console.log(err);
              res.send({ success: false, message: "Server Error" });
            });
        })
        .catch(err => res.send(err));
    } else {
      res.send({
        success: false,
        message: "You have no rights to delete this users!"
      });
    }
  });
});

module.exports = router;
