const { MailingLogs } = require("../../config/database");
const {
  Role,
  User,
  RiskRegister,
  MailingDays,
} = require("../../config/database");
const { getBranches } = require("../../user-management/util/branches");
const { Op, fn, col } = require("sequelize");
const _ = require("lodash");
const logger = require("../../config/logger");
const moment = require("moment");

const { sendMessage } = require("../../util/send_email");
const { alertEmailTemplate } = require("../../util/email_template");
const role = require("../../user-management/models/role");

/**
 * This function filters the risk register and finds out the branches which have not entered the
 * risk register events. Then this function sends email to the users when the days of data not entered
 * exceeds the Alert data.
 */

module.exports = async function BranchFilter() {
  const result = [];
  let days = {};
  await MailingDays.findOne({ order: [["createdAt", "DESC"]] }).then((data) => {
    days = data ? data : { makerDays: 5, checkerDays: 1, approverDays: 10 };
  });

  const branches = await getBranches(["id", "name"]);
  const riskRegisterMakers = await RiskRegister.findAll({
    where: {
      createdAt: {
        [Op.gte]: moment().subtract(days.makerDays, "days").toDate(),
      },
    },
    attributes: ["branchId", [fn("count", col("id")), "count"]],
    group: ["branchId"],
  });
  const riskRegisterCheckers = await RiskRegister.findAll({
    where: {
      createdAt: {
        [Op.gte]: moment().subtract(days.checkerDays, "days").toDate(),
      },
    },
    attributes: ["branchId", [fn("count", col("id")), "count"]],
    group: ["branchId"],
  });
  const riskRegisterApprovers = await RiskRegister.findAll({
    where: {
      createdAt: {
        [Op.gte]: moment().subtract(days.approverDays, "days").toDate(),
      },
    },
    attributes: ["branchId", [fn("count", col("id")), "count"]],
    group: ["branchId"],
  });

  // FINDING USERS
  const makerEmails = [];
  const checkerEmails = [];
  const approverEmails = [];
  User.belongsTo(Role);
  await Promise.all(
    branches.map(async (b) => {
      const sendToMaker =
        _.filter(riskRegisterMakers, { branchId: b.id }).length === 0;
      const sendToChecker =
        _.filter(riskRegisterCheckers, { branchId: b.id }).length === 0;
      const sendToApprover =
        _.filter(riskRegisterApprovers, { branchId: b.id }).length === 0;
      if (sendToMaker || sendToChecker || sendToMaker) {
        return User.findAll({
          attributes: ["email", "id", "branchId", "firstName", "lastName"],
          where: {
            branchId: b.id,
            isDeleted: false,
            isActive: true,
          },
          raw: true,
          include: [
            {
              model: Role,
              attributes: ["isMaker", "isChecker", "isApprover", "isAdmin"],
            },
          ],
        }).then((users) => {
          if (sendToApprover) {
            _.filter(users, { "role.isApprover": true }).map((u) => {
              approverEmails.push({
                email: u.email,
                branchId: u.branchId,
                firstName: u.firstName,
                lastName: u.lastName,
              });
            });
          }
          if (sendToChecker) {
            // checkerEmails.concat(
            //   _.filter(users, { "role.isChecker": true }).map((u) => {
            //     return {
            //       email: u.email,
            //       branchId: u.branchId,
            //       firstName: u.firstName,
            //       lastName: u.lastName,
            //     };
            //   })
            // );
            _.filter(users, { "role.isChecker": true }).map((u) => {
              checkerEmails.push({
                email: u.email,
                branchId: u.branchId,
                firstName: u.firstName,
                lastName: u.lastName,
              });
            });
          }
          if (sendToMaker) {
            _.filter(users, {
              "role.isMaker": true,
              "role.isAdmin": false,
            }).map((u) => {
              makerEmails.push({
                email: u.email,
                branchId: u.branchId,
                firstName: u.firstName,
                lastName: u.lastName,
              });
            });
          }
        });
      }
    })
  );
  if (makerEmails != "") {
    let mailingDays = days.makerDays;
    let actionName = "registered";
    await makerEmails.forEach(async (data) => {
      const info = {
        sendAt: moment(),
        mail: data.email,
        role: "Maker",
        branchId: data.branchId,
      };
      await MailingLogs.create({ ...info }).catch((err) => {
        logger.error(err);
      });
      await sendMessage(alertEmailTemplate({ data, mailingDays, actionName }));
    });
  }
  if (checkerEmails != "") {
    let mailingDays = days.checkerDays;
    let actionName = "checked";
    await checkerEmails.forEach(async (data) => {
      const info = {
        sendAt: moment(),
        mail: data.email,
        role: "Checker",
        branchId: data.branchId,
      };
      await MailingLogs.create({ ...info }).catch((err) => {
        logger.error(err);
      });
      await sendMessage(alertEmailTemplate({ data, mailingDays, actionName }));
    });
  }
  if (approverEmails != "") {
    let mailingDays = days.approverDays;
    let actionName = "approved";
    await approverEmails.forEach(async (data) => {
      // const info = {
      //   sendAt: moment(),
      //   mail: data,
      //   role: "Approver",
      //   branchId: 1
      // };
      // await MailingLogs.create({ ...info })
      //   .then(d => res.status(200).send("Success"))
      //   .catch(e => res.status(400), send("Error !"));
      await sendMessage(alertEmailTemplate({ data, mailingDays, actionName }));
    });
  }
};
