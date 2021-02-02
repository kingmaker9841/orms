const nodemailer = require("nodemailer");
const { MailingLogs } = require("../config/database");
const { Branch, Role, User, RiskRegister, MailingDays } = require("./database");
const { getBranches } = require("../user-management/util/branches");
const { Op, fn, col } = require("sequelize");
const _ = require("lodash");
const logger = require("./logger");
const moment = require("moment");

const { EMAIL } = require("./credentials");
module.exports = async function BranchFilter() {
  const result = [];
  let days = {};
  await MailingDays.findOne({ order: [["createdAt", "DESC"]] }).then(data => {
    days = data ? data : { makerDays: 3, checkerDays: 5, approverDays: 10 };
  });

  const branches = await getBranches(["id", "name"]);
  const riskRegisterMakers = await RiskRegister.findAll({
    where: {
      createdAt: {
        [Op.gte]: moment()
          .subtract(days.makerDays, "days")
          .toDate()
      }
    },
    attributes: ["branchId", [fn("count", col("id")), "count"]],
    group: ["branchId"]
  });
  const riskRegisterCheckers = await RiskRegister.findAll({
    where: {
      createdAt: {
        [Op.gte]: moment()
          .subtract(days.checkerDays, "days")
          .toDate()
      }
    },
    attributes: ["branchId", [fn("count", col("id")), "count"]],
    group: ["branchId"]
  });
  const riskRegisterApprovers = await RiskRegister.findAll({
    where: {
      createdAt: {
        [Op.gte]: moment()
          .subtract(days.approverDays, "days")
          .toDate()
      }
    },
    attributes: ["branchId", [fn("count", col("id")), "count"]],
    group: ["branchId"]
  });

  // FINDING USERS
  const makerEmails = [];
  // const makerEmails =  [{ email: "dillichalise@gmail.com", branchId: 1}];
  const checkerEmails = [];
  const approverEmails = [];
  User.belongsTo(Role);
  await Promise.all(
    branches.map(async b => {
      const sendToMaker =
        _.filter(riskRegisterMakers, { branchId: b.id }).length === 0;
      const sendToChecker =
        _.filter(riskRegisterCheckers, { branchId: b.id }).length === 0;
      const sendToApprover =
        _.filter(riskRegisterApprovers, { branchId: b.id }).length === 0;
      if (sendToMaker || sendToChecker || sendToApprover) {
        return User.findAll({
          attributes: ["email", "id", "branchId", "firstName", "lastName"],
          where: {
            branchId: b.id,
            isDeleted: false,
            isActive: true
          },
          raw: true,
          include: [
            {
              model: Role,
              attributes: ["isMaker", "isChecker", "isApprover", "isAdmin"]
            }
          ]
        }).then(users => {
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

  let transporter = await nodemailer.createTransport({
    host: EMAIL.HOST,
    port: EMAIL.PORT,
    secureConnection: EMAIL.SECURE,
    // requireTLS: true,
    auth: {
      user: EMAIL.USERNAME,
      pass: EMAIL.PASSWORD
    },
    tls: {
      ciphers: "SSLv3"
    }
  });
  if (makerEmails != "") {
    let mailingDays = days.makerDays;
    await makerEmails.forEach(async data => {
      const info = {
        sendAt: moment(),
        mail: data.email,
        role: 'Maker',
        branchId: data.branchId
      };
      await MailingLogs.create({ ...info })
        .catch(err => {
          logger.error(err);
        });
      let mailOptions = {
        from: EMAIL.USERNAME,
        to: data.email,
        subject: "Risk Not Registered from last few Days",
        html: `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="X-UA-Compatible" content="ie=edge" />
      </head>
      
      <body class="ml-5 mt-5" >
          <div style="width:450px; margin:0 auto;">
          <img  src='../../public/s.jpg' alt='logo' width='400px' height='80px'>
          
        <div class="card border-danger mb-5 mt-4" style="max-width: 30rem;">
          <div class="card-body text-danger">
            <h5 class="card-title">Dear Sir/Ma'am ,</h5>
            <p class="lead">
            It has been observed that you have not registered any risk into Operational Risk Register Portal for ${mailingDays} or more days. Please provide the justification for the same.
            </p>
          </div>
        </div>
       
        <br/>
        <p align='center'>@ Copyright Risk Department<br/>
          Sunrise Bank</p>
        </div>
      </body>
      </body>
    </html>`
      };

      await transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          logger.error(error);
        }
        // result.status(200).send("success");
      });
    });
  }
  if (checkerEmails != "") {
    let mailingDays = days.checkerDays;
    await checkerEmails.forEach(async data => {
      const info = {
        sendAt: moment(),
        mail: data.email,
        role: 'Checker',
        branchId: data.branchId
      };
      await MailingLogs.create({ ...info })
        .catch(err => {
          logger.error(err);
        });
      let mailOptions = {
        from: EMAIL.USERNAME,
        to: data.email,
        subject: "Risk Not checked from last few Days",
        html: `<!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta http-equiv="X-UA-Compatible" content="ie=edge" />
          </head>
          
          <body class="ml-5 mt-5" >
              <div style="width:450px; margin:0 auto;">
              <img  src='../../public/s.jpg' alt='logo' width='400px' height='80px'>
              
            <div class="card border-danger mb-5 mt-4" style="max-width: 30rem;">
              <div class="card-body text-danger">
                <h5 class="card-title">Dear Branch Manager ,</h5>
                <p class="lead">
                It has been observed that you have not checked any risk into Operational Risk Register Portal for ${mailingDays} or more days. Please provide the justification for the same. 
                </p>
              </div>
            </div>
            
            <br/>
            <p align='center'>@ Copyright Risk Department<br/>
              Sunrise Bank</p>
            </div>
          </body>
          </body>
        </html>`
      };
      await transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          logger.error(error);
        }
        // result.status(200).send("success");
      });
    });
  }
  if (approverEmails != "") {
    let mailingDays = days.approverDays;
    await approverEmails.forEach(async data => {
      let mailOptions = {
        from: EMAIL.USERNAME,
        to: data.email,
        subject: "Risk Not approved from last few Days",
        html: `<!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta http-equiv="X-UA-Compatible" content="ie=edge" />
          </head>
          
          <body class="ml-5 mt-5" >
              <div style="width:450px; margin:0 auto;">
              <img  src='../../public/s.jpg' alt='logo' width='400px' height='80px'>
              
            <div class="card border-danger mb-5 mt-4" style="max-width: 30rem;">
              <div class="card-body text-danger">
                <h5 class="card-title">Dear Sir,</h5>
                <p class="lead">
                It has been observed that you have not approved any risk into Operational Risk Register Portal for ${mailingDays} or more days. Please provide the justification for the same.  
                </p>
              </div>
            </div>
           <br/>
            <p align='center'>@ Copyright Risk Department<br/>
              Sunrise Bank</p>
            </div>
          </body>
          </body>
        </html>`
      };
      await transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          logger.error(error);
        }
        // result.status(200).send("success");
      });
    });
  }
};
