const router = require("../../user-management/routes/users");
const { Form } = require("../../config/database");
const logger = require("../../config/logger");
const { Op } = require("sequelize").Op;

router.get("/forms", (req, res, next) => {
  Form.findAll({
    where: { isDeleted: false, },
    order: [["createdAt", "DESC"]],
    attributes: ["id", "name", "description", "isActive", "hasReport", "type"],
  })
    .then((forms) => {
      res.send(forms);
    })
    .catch((err) => {
      logger.error(err);
      res.status(500).send({ data: err, message: "Error!!" });
    });
});

router.post("/forms", (req, res, next) => {
  const form = req.body;
  Form.create(form)
    .then((form) => {
      res.send(form);
    })
    .catch((err) => {
      logger.error(err);
      res.status(500).send({ data: err, message: "Error!!" });
    });
});

router.get("/forms/:id", (req, res, next) => {
  const id = req.params.id;
  Form.findOne({
    where: { id: id, isDeleted: false },
  }).then((form) => {
    if (form) {
      form.formData = form.formData || "[]";
      res.send(form);
    } else {
      res.status(404).send("Not found!!");
    }
  });
});

router.put("/forms", (req, res, next) => {
  const form = req.body;
  Form.update(form, { where: { id: form.id } })
    .then((_) => {
      res.send("Success in updating.");
    })
    .catch((err) => {
      logger.error(err);
      res.status(500).send({ data: err, message: "Error in updating!!" });
    });
});

router.delete("/forms/:id", (req, res, next) => {
  Form.update(
    {
      isDeleted: true,
    },
    {
      where: { id: req.params.id },
    }
  )
    .then((_) => {
      res.send("Deleted Sucessfully");
    })
    .catch((err) => {
      logger.error(err);
      res.status(500).send({ data: err, message: "Error in deletion!!" });
    });
});

module.exports = router;
