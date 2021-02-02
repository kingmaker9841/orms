const fs = require("fs");
const {
  Document,
  Packer,
  Paragraph,
  TextRun,
  Table,
  TableRow,
  TableCell,
  WidthType,
} = require("docx");
const { getBranch } = require("../../user-management/util/branches");
const { User, Role, RiskRegister } = require("../../config/database");
const sequelize = require("sequelize");
const moment = require("moment");

const lineBreak = new TextRun({}).break();
const longGap = "\t\t\t\t\t\t\t\t";

/**
 * @method module:Reporting#getHeaderCommitmentLetter
 * @param {Object} options  Options to generate the header
 * @returns Header for the commitment letter
 */
function getHeader(options) {
  const bm = options.branchManager ? options.branchManager : {};
  const data = [
    new TextRun(
      `The Branch Manager,${longGap}Date: ` + moment().format("YYYY-MM-DD")
    ),
    lineBreak,
    new TextRun(`${options.branch.name}. Branch,`),
    lineBreak,
    new TextRun("Sunrise Bank Limited."),
    lineBreak,
    lineBreak,
    new TextRun({
      text:
        "\t\tRe: Rectification of errors and confirmation for not repeating the errors.",
      bold: true,
    }),
    lineBreak,
    lineBreak,
    new TextRun(
      `Dear Mr./Ms. ` + (!!bm.firstName ? bm.firstName : "____________") + `,`
    ),
    lineBreak,
    new TextRun(
      "As per the Operational Risk Register for the quarter-ending on " +
        moment(options.endDate).format("YYYY-MM-DD") +
        "., the following staffs are found part of errors:"
    ),
    lineBreak,
  ];

  return data;
}

/**
 * @method module:Reporting#getTableDataCommitmentLetter
 * @param {Object} queryOptions  - Query options to generate the table data
 * @returns Table data for the commitment letter
 */
async function getTableData(queryOptions) {
  const data = await RiskRegister.findAll({
    where: {
      ...queryOptions,
    },
    attributes: ["relatedStaff"],
  });
  const inputerArr = [];
  const authorizerArr = [];
  data.forEach((d) => {
    const [inputer, authorizer] = d.relatedStaff.split("/");
    if (inputer) inputerArr.push(inputer);
    if (authorizer) authorizerArr.push(authorizer);
  });
  const countArr = [];
  inputerArr.forEach((inputer) => {
    let isFound = false;
    let index = false;
    countArr.forEach((c, i) => {
      if (c.name === inputer) {
        isFound = true;
        index = i;
      }
    });
    if (isFound) {
      const val = countArr[index];
      countArr[index] = {
        ...val,
        inputer: val.inputer + 1,
      };
    } else {
      countArr.push({
        name: inputer,
        inputer: 1,
      });
    }
  });
  authorizerArr.forEach((authorizer) => {
    let isFound = false;
    let index = false;
    countArr.forEach((c, i) => {
      if (c.name === authorizer) {
        isFound = true;
        index = i;
      }
    });
    if (isFound) {
      const val = countArr[index];
      countArr[index] = {
        ...val,
        authorizer: val.authorizer + 1,
      };
    } else {
      countArr.push({
        name: authorizer,
        authorizer: 1,
      });
    }
  });
  return countArr;
}

/**
 * @method module:Reporting#getTableCommitmentLetter
 * @param {Object} options  - Options to generate the tabular report
 * @param {Array} tableData - Table data to create the table
 * @returns Table generated to output in commitment letter
 */
function getTable(options, tableData) {
  const data = [
    new Table({
      width: {
        size: 100,
        type: WidthType.PERCENTAGE,
      },
      rows: [
        new TableRow({
          children: [
            new TableCell({
              children: [new Paragraph("S.N.")],
            }),
            new TableCell({
              children: [new Paragraph("Name of Staff")],
            }),
            new TableCell({
              children: [new Paragraph("Input")],
            }),
            new TableCell({
              children: [new Paragraph("Authorization")],
            }),
          ],
        }),
        ...tableData.map((tableD, i) => {
          return new TableRow({
            children: [
              new TableCell({
                children: [new Paragraph(i + 1 + "")],
              }),
              new TableCell({
                children: [new Paragraph(tableD.name)],
              }),
              new TableCell({
                children: [
                  new Paragraph("" + (tableD.inputer ? tableD.inputer : 0)),
                ],
              }),
              new TableCell({
                children: [
                  new Paragraph(
                    "" + (tableD.authorizer ? tableD.authorizer : 0)
                  ),
                ],
              }),
            ],
          });
        }),
      ],
    }),
  ];
  return data;
}

/**
 * @method module:Reporting#getFooterCommitmentLetter
 * @param {Object} options  - Options to generate the footer data
 * @returns Footer of the commitment letter
 */
function getFooter(options) {
  const unrectifiedErrorsCount = options.unrectifiedErrors
    ? options.unrectifiedErrors.count
    : 0;
  const data = [
    new TextRun(
      `Further, ${unrectifiedErrorsCount} error/s are still to be rectified out of the total rectifiable errors found for the branch.`
    ),
    lineBreak,
    new TextRun(
      `As per the instructions/ minutes dated ` +
        "_____________________" +
        `of Risk Management Committee, we request you to rectify the errors immediately and provide commitment along-with operation in-charge and respective staff for not repeating the errors again in future.`
    ),
    lineBreak,
    lineBreak,
    new TextRun(`Thanks and regards,`),
    lineBreak,
    new TextRun(`....................${longGap}..........................`),
    lineBreak,
    new TextRun(`……………………${longGap}…………………`),
    lineBreak,
    new TextRun({
      text: `Head-Risk Management Department\t\t\t\t\tHead-Branch Operation`,
      bold: true,
    }),
  ];
  return data;
}

/**
 * @method module:Reporting#getCommitmentLetter
 * @param {String} query   - Query to generate the commitment letter
 * @param {Object} payload - Payload of the user who has requested for the commitment letter
 * @returns Generates the commitment letter and returns the path it for downloading
 */
async function getLetter(query, payload) {
  const branchId = query.branchId;
  const reportType = query.type;
  const startDate = query.startDate;
  const endDate = moment(startDate).add(3, "month").format("YYYY-MM-DD");

  const branch = await getBranch(branchId);
  User.hasOne(Role, { sourceKey: "roleId", foreignKey: "id" });
  const branchManager = await User.findOne({
    where: {
      branchId: branchId,
    },
    include: [
      {
        model: Role,
        where: { isChecker: true },
      },
    ],
  });
  const options = {
    branch: branch,
    branchManager: branchManager,
    endDate: endDate,
  };

  const queryOptions = {
    branchId: branchId,
    tracedDate: {
      [sequelize.Op.gte]: startDate,
      [sequelize.Op.lte]: endDate,
    },
  };

  options.unrectifiedErrors = await RiskRegister.findOne({
    attributes: [[sequelize.fn("count", sequelize.col("id")), "count"]],
    where: {
      ...queryOptions,
      rectificationDate: null,
    },
    raw: true,
    group: [["id"]],
  });

  const tableData = await getTableData(queryOptions);

  const doc = new Document();
  doc.addSection({
    properties: {},
    children: [
      new Paragraph({
        children: [...getHeader(options)],
      }),
      ...getTable(options, tableData),
      new Paragraph({
        children: [...getFooter(options)],
      }),
    ],
  });

  const file = {
    path:
      "reports/" +
      reportType +
      "/" +
      options.branch.name +
      "-" +
      moment().format("YYYY-MM-DD") +
      ".docx",
  };
  return await Packer.toBuffer(doc).then((buffer) => {
    fs.writeFileSync(file.path, buffer);
    return file.path;
  });
}

module.exports = {
  getLetter,
};
