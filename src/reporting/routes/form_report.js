const { FormReport, FormReportValue, Form } = require("../../config/database");
const logger = require("../../config/logger");

const router = require("express").Router();

router.post("/form-report", async (req, res, next) => {
  const formId = req.body.formId;
  const formReportValues = req.body.formValues;
  const createdBy = 1;
  const formReport = {
    formId,
    createdBy,
  };
  FormReport.create(formReport)
    .then(async (report) => {
      await Promise.all(
        [
          ...formReportValues.map((reportValue) => {
            const formReportValue = {
              formReportId: report.id,
              label: reportValue.label,
              name: reportValue.name,
              value: JSON.stringify(reportValue.value),
            };
            return FormReportValue.create(formReportValue);
          }),
        ],
        [
          Form.update(
            {
              hasReport: true,
            },
            { where: { isDeleted: false, id: formReport.formId } }
          ),
        ]
      );
    })
    .then((_) => {
      res.send();
    })
    .catch((err) => {
      logger.error(err);
      res.status(500).send("Error!!");
    });
});

router.get("/form-report/:id", (req, res, next) => {
  const formId = req.params.id;
  FormReport.belongsTo(Form);
  FormReport.hasMany(FormReportValue);
  FormReportValue.belongsTo(FormReport);

  Promise.all([
    Form.findOne({
      where: { id: formId },
      attributes: ["formData", "type", "name", "description"],
    }),
    FormReport.findAll({
      where: { formId: formId, isDeleted: false },
      include: [
        {
          model: FormReportValue,
          attributes: ["id", "name", "value"],
          required: true,
          raw: true,
          include: [
            {
              model: FormReport,
              attributes: ["id"],
            },
          ],
        },
      ],
      attributes: ["id", "formId"],
      order: [[{ model: FormReportValue }, "name", "ASC"]],
    }),
  ])
    .then(([form, formReport]) => {
      res.send({ form, formReport });
    })
    .catch((err) => {
      logger.error(err);
      res.status(500).send("Error!!");
    });
});

router.get("/form-report", (req, res, next) => {
  FormReport.belongsTo(Form);
  FormReport.findAll({
    where: { isDeleted: false },
    include: [
      {
        model: Form,
        attributes: ["name", "description"],
        required: true,
      },
    ],
  })
    .then((reports) => {
      res.send(reports);
    })
    .catch((err) => {
      logger.error(err);
      res.status(500).send("Error!!");
    });
});

router.delete("/form-report/:id", (req, res, next) => {
  Promise.all[
    (FormReport.update(
      {
        isDeleted: true,
      },
      {
        where: { formId: req.params.id },
      }
    ),
    Form.update(
      {
        hasReport: false,
      },
      {
        where: { id: req.params.id },
      }
    ))
  ]
    .then((_) => {
      res.send("Deleted Successfully");
    })
    .catch((err) => {
      logger.error(err);
      res.status(500).send({ data: err, message: "Error in deletion!!" });
    });
});

module.exports = router;
