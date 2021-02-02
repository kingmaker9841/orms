const { getQuery } = require("../sql/branch_summary");
const {
  sequelize,
  RiskArea,
  RiskRegister,
  Branch,
  RiskEstimation,
  RiskEstimationHO,
  ReportDownload,
  BranchScore,
} = require("../../config/database");
const logger = require("../../config/logger");
const Sequelize = require("sequelize");
const XLSX = require("xlsx");
const moment = require("moment");
const _ = require("lodash");
const fs = require("fs");
const Op = Sequelize.Op;

/**
 * @method module:Reporting#getBranchSummary
 * @param {Object} options  - Object to calculate the branch summary report
 * @returns Returns the branch summary report
 */
async function getBranchSummary(options) {
  const query = getQuery(options);
  const branchSummaryRaw = await sequelize.query(query, {
    type: Sequelize.QueryTypes.SELECT,
  });
  RiskArea.hasMany(RiskRegister, {
    foreignKey: "riskAreaCode",
    sourceKey: "code",
  });
  RiskRegister.belongsTo(RiskArea, {
    foreignKey: "riskAreaCode",
    sourceKey: "code",
  });
  const riskAreas = await RiskArea.findAll({
    where: { isActive: true, isDeleted: false },
    order: [["code", "ASC"]],
    include: [
      {
        model: RiskRegister,
        where: {
          tracedDate: {
            [Op.lt]: new Date(
              new Date(options.startDate).getTime() +
                Number(options.frequency) * 30 * 86400 * 1000
            ),
            [Op.gt]: new Date(new Date(options.startDate)),
          },
          branchId: options.branchId,
          status: options.status,
        },
        required: false,
      },
    ],
  });
  const branchSummary = [];
  for (const riskArea of riskAreas) {
    const riskAreaId = riskArea.id;
    const estimationBranch = await RiskEstimation.findOne({
      where: { branchId: options.branchId, riskAreaId: riskAreaId },
    });
    const estimationHO = await RiskEstimationHO.findOne({
      where: { riskAreaId: riskAreaId },
    });
    const branchSum = branchSummaryRaw.filter((b) =>
      b.riskAreaCode === riskArea.code ? 1 : 0
    );
    if (branchSum.length > 0) {
      let likelihood = 0;
      let impact = 0;
      switch (options.mergeFunction) {
        case "min":
          likelihood = _.minBy(branchSum, "likelihood").likelihood;
          impact = _.minBy(branchSum, "impact").likelihood;
          break;
        case "max":
          likelihood = _.maxBy(branchSum, "likelihood").likelihood;
          impact = _.maxBy(branchSum, "impact").likelihood;
          break;
        default:
          likelihood = _.sumBy(branchSum, "likelihood") / branchSum.length;
          impact = _.sumBy(branchSum, "impact") / branchSum.length;
          break;
      }
      branchSummary.push({
        occurrence: _.sumBy(branchSum, "occurrence"),
        amountTiming: _.sumBy(branchSum, "amountTiming"),
        financialImpact: _.sumBy(branchSum, "financialImpact"),
        likelihood: likelihood,
        impact: impact,
        riskAreaName: riskArea.name,
        riskAreaCode: riskArea.code,
        riskAreaId: riskArea.id,
        weight: estimationHO ? estimationHO.weight : 0,
        previousRiskScore: estimationBranch
          ? estimationBranch.previousRiskScore
          : 0,
        estLikelihood: estimationBranch ? estimationBranch.likelihood : 0,
        estImpact: estimationBranch ? estimationBranch.impact : 0,
      });
    }
  }
  const output = {
    branchSummary: branchSummary,
    riskAreas: riskAreas,
  };
  return output;
}

async function getMakerBranchSummary(options) {
  const query = getQuery(options);
  const branchSummaryRaw = await sequelize.query(query, {
    type: Sequelize.QueryTypes.SELECT,
  });
  RiskArea.hasMany(RiskRegister, {
    foreignKey: "riskAreaCode",
    sourceKey: "code",
  });
  RiskRegister.belongsTo(RiskArea, {
    foreignKey: "riskAreaCode",
    sourceKey: "code",
  });
  const riskAreas = await RiskArea.findAll({
    where: { isActive: true, isDeleted: false },
    order: [["code", "ASC"]],
    include: [
      {
        model: RiskRegister,
        where: {
          tracedDate: {
            [Op.lt]: new Date(
              new Date(options.startDate).getTime() +
                Number(options.frequency) * 30 * 86400 * 1000
            ),
            [Op.gt]: new Date(new Date(options.startDate)),
          },
          branchId: options.branchId,
          status: options.status,
          createdBy: Number(options.creatorId)
        },
        required: true,
      },
    ],
  });
  // console.log("riskAreas", JSON.stringify(riskAreas));
  // const branchSummary = [];
  // for (const riskArea of riskAreas) {
  //   const riskAreaId = riskArea.id;
  //   const estimationBranch = await RiskEstimation.findOne({
  //     where: { branchId: options.branchId, riskAreaId: riskAreaId },
  //   });
  //   const estimationHO = await RiskEstimationHO.findOne({
  //     where: { riskAreaId: riskAreaId },
  //   });
  //   const branchSum = branchSummaryRaw.filter((b) =>
  //     b.riskAreaCode === riskArea.code ? 1 : 0
  //   );
  //   if (branchSum.length > 0) {
  //     let likelihood = 0;
  //     let impact = 0;
  //     switch (options.mergeFunction) {
  //       case "min":
  //         likelihood = _.minBy(branchSum, "likelihood").likelihood;
  //         impact = _.minBy(branchSum, "impact").likelihood;
  //         break;
  //       case "max":
  //         likelihood = _.maxBy(branchSum, "likelihood").likelihood;
  //         impact = _.maxBy(branchSum, "impact").likelihood;
  //         break;
  //       default:
  //         likelihood = _.sumBy(branchSum, "likelihood") / branchSum.length;
  //         impact = _.sumBy(branchSum, "impact") / branchSum.length;
  //         break;
  //     }
  //     branchSummary.push({
  //       occurrence: _.sumBy(branchSum, "occurrence"),
  //       amountTiming: _.sumBy(branchSum, "amountTiming"),
  //       financialImpact: _.sumBy(branchSum, "financialImpact"),
  //       likelihood: likelihood,
  //       impact: impact,
  //       riskAreaName: riskArea.name,
  //       riskAreaCode: riskArea.code,
  //       riskAreaId: riskArea.id,
  //       weight: estimationHO ? estimationHO.weight : 0,
  //       previousRiskScore: estimationBranch
  //         ? estimationBranch.previousRiskScore
  //         : 0,
  //       estLikelihood: estimationBranch ? estimationBranch.likelihood : 0,
  //       estImpact: estimationBranch ? estimationBranch.impact : 0,
  //     });
  //   }
  // }
  const output = {
    // branchSummary: branchSummary,
    riskAreas: riskAreas,
  };
  return output;
}

/**
 * @method module:Reporting#getBranchSummarySheet
 * @param {Object} branchSummary  - Object of the branch summary data
 * @param {Object} options        - Options to calculate the branch summary report
 * @returns Excel sheet report for the branch summary
 */
function getBranchSummarySheet(branchSummary, options) {
  const isApprover = options.isApprover;
  const output = [
    [
      "S.N.",
      "Risk Areas/Functions",
      "Previous Risk Score (A)",
      "Likelihood",
      "Impact",
      "Risk Score (B)",
      "Register Code",
      "Occurrence",
      "Amount/Timing",
      "Financial Impact",
      "Non-Financial Impact",

      ...(isApprover
        ? [
            "Likelihood",
            "Impact",
            "Actual Risk Score(C)",
            "Weight",
            "Weighted Risk",
            "Remarks",
            "(A-C)",
            "(B-C)",
            "Recommendation",
          ]
        : []),
    ],
  ];
  let SNo = 1;
  for (item of branchSummary) {
    output.push([
      SNo,
      item.riskAreaName,
      item.previousRiskScore,
      item.estLikelihood,
      item.estImpact,
      item.estLikelihood * item.estImpact,
      item.riskAreaCode,
      item.occurrence,
      item.amountTiming,
      item.financialImpact,
      item.nonFinancialImpact ? item.nonFinancialImpact : "",

      ...(isApprover
        ? [
            item.likelihood,
            item.impact,
            item.likelihood * item.impact,
            item.weight,
            (item.likelihood * item.impact * item.weight) / 100,
            item.remarks ? item.remarks : "",
            item.previousRiskScore - item.likelihood * item.impact,
            item.estLikelihood * item.estImpact - item.likelihood * item.impact,
            item.recommendation ? item.recommendation : "",
          ]
        : []),
    ]);
    SNo++;
  }
  return output;
}

/**
 * @method module:Reporting#getRiskRegisterData
 * @param {Array<Object>} riskRegisters  - List of risk register event
 * @param {Object} branch                - Object of the branch on which the risk register data is calculated
 * @returns Risk register data for the particular branch
 */
function getRiskRegisterData(riskRegisters, branch) {
  const output = [
    [
      "S.N.",
      "Branch",
      "Transaction Date",
      "Risk Particulars",
      "Risk Trigger",
      "Occurrence",
      "Amount/Timing",
      "Financial Impact",
      "Non-Financial Impact",
      "Related Account",
      "Related Staff",
      "Traced Date",
      "Traced By",
      "Rectification Date",
      "Remarks",
    ],
  ];
  let SNo = 1;
  for (item of riskRegisters) {
    output.push([
      SNo,
      branch.name,
      moment(item.transactionDate).format("Do MM YYYY"),
      item.riskAreaParticular,
      item.riskTrigger,
      item.occurrence,
      item.amountTiming,
      item.financialImpact,
      item.nonFinancialImpact,
      item.relatedAccount,
      item.relatedStaff, //Related Staff
      moment(item.tracedDate).format("Do MM YYYY"),
      item.tracedBy, //Traced By
      moment(item.rectificationDate).format("Do MM YYYY"),
      item.remarks,
    ]);
    SNo++;
  }
  return output;
}

/**
 * @method module:Reporting#createBranchSummaryReport
 * @param {Object} data  - Data to generate the report
 * @returns Generates excel and returns the path to the generated excel for downloading
 */
async function createBranchSummaryReport(data) {
  const branch = await Branch.findOne({
    where: { isDeleted: false, id: data.options.branchId },
  });
  const workbook = XLSX.utils.book_new();

  const branchSummaryData = await getBranchSummarySheet(
    data.branchSummary,
    data.options
  );
  const wsBranchSummary = XLSX.utils.aoa_to_sheet(branchSummaryData);
  XLSX.utils.book_append_sheet(workbook, wsBranchSummary, "Branch Summary");

  for (riskArea of data.riskAreas) {
    const registerData = await getRiskRegisterData(
      riskArea.risk_registers,
      branch,
      riskArea
    );
    const wsRegisters = XLSX.utils.aoa_to_sheet(registerData);
    XLSX.utils.book_append_sheet(workbook, wsRegisters, riskArea.code);
  }

  const fileName =
    branch.name +
    "-" +
    Date.now() +
    "-" +
    new Date().toJSON().slice(0, 10) +
    ".xlsx";
  const pathName = "reports/branch-summary/" + fileName;
  XLSX.writeFile(workbook, pathName);

  // ReportDownload.create({
  //     branchId: branch.id,
  //     type: "branch-summary",
  //     startDate: data.options.startDate,
  //     path: pathName,
  // });

  return { path: pathName };
}

/**
 * @method module:Reporting#saveBranchSummaryReport
 * @param {Object} data      - Data to generate the report
 * @param {Object} payload   - Payload of the user who is generating the report
 * @returns Saves the branch summary final report after overriding
 */
async function saveBranchSummaryReport(data, payload) {
  const branchSummary = data.branchSummary;
  const options = data.options;
  const branchId = options.branchId;
  const startDate = options.startDate;
  const scores = await BranchScore.findAll({
    where: {
      isDeleted: false,
      branchId: branchId,
      startDate: new Date(startDate),
    },
  });
  const isOverride = options.isOverride;
  if (isOverride) {
    fs.writeFileSync(
      "reports/override/branch_summary_" + Date.now() + ".json",
      JSON.stringify({
        user_info: {
          ...payload,
        },
        branch_scores: scores,
      })
    );
    await BranchScore.update(
      {
        isDeleted: true,
        editedBy: payload.id,
      },
      {
        where: {
          isDeleted: false,
          branchId: branchId,
          startDate: new Date(startDate),
        },
      }
    );
  }
  if (scores.length === 0 || isOverride) {
    try {
      await Promise.all(
        branchSummary.map((bS) => {
          return BranchScore.create({
            branchId: branchId,
            startDate: startDate,
            riskAreaId: bS.riskAreaId,
            riskAreaCode: bS.riskAreaCode,
            occurrence: bS.occurrence,
            amountTiming: bS.amountTiming,
            financialImpact: bS.financialImpact,
            actualRiskScore: bS.likelihood * bS.impact,
            previousRiskScore: bS.previousRiskScore,
            estimatedRiskScore: bS.estLikelihood * bS.estImpact,
            createdBy: payload.id,
          });
        })
      );
      return { success: true, message: "Saved!" };
    } catch (err) {
      logger.error(err);
      return { success: false, message: "Oops! Something went wrong" };
    }
  } else {
    return {
      success: false,
      message: "This branch's data has already been saved!",
    };
  }
}

module.exports = {
  getBranchSummary,
  createBranchSummaryReport,
  saveBranchSummaryReport,
  getMakerBranchSummary
};
