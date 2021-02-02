/**
 * @module Database
 */
const Sequelize = require('sequelize');
const { DB } = require('./credentials');

/**
 * Create a sequelize database instance
 * @method
 * @param {String} databaseName     Database name
 * @param {String} username         Username to access the database
 * @param {String} password         Password for database access user
 * @param {Object} options          Database connection options
 * @param {String} options.host     Host server for database
 * @param {Number} options.port     Port where database is served
 * @param {String} options.dialect  Dialect for database (mysql,mssql...)
 * @param {Boolean} options.logging 'false' to stop logging of SQL queries
 */
const sequelize = new Sequelize(DB.NAME, DB.USERNAME, DB.PASSWORD, {
  host: DB.HOST,
  port: DB.PORT,
  dialect: DB.DIALECT,
  logging: false,
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});
// var sequelize = new Sequelize("risk_analysis", "admin", "sagarghimire", {
//   host: "database-2.cctmb12jdi7j.us-east-1.rds.amazonaws.com",
//   port: 1433,
//   dialect: "mssql",
//   logging: false,
//   dialectOptions: {
//     ssl: "Amazon RDS",
//     options: { requestTimeout: 300000 }
//   },
//   pool: { maxConnections: 5, maxIdleTime: 30 },
//   language: "en"
// });
// sequelize
//   .authenticate()
//   .then(data => console.log("Database is up and Running!"))
//   .catch(err => console.log("Error connecting to the database!"));
const User = require('../user-management/models/user')(sequelize, Sequelize);
const Branch = require('../user-management/models/branch')(
  sequelize,
  Sequelize
);
const Province = require('../user-management/models/province')(
  sequelize,
  Sequelize
);
const ProvinceBranch = require('../user-management/models/province_branch')(
  sequelize,
  Sequelize
);
const Department = require('../user-management/models/department')(
  sequelize,
  Sequelize
);
const LoginLog = require('../misc/models/login_log')(sequelize, Sequelize);
const DeleteLog = require('../misc/models/delete_log')(sequelize, Sequelize);
const AuditLog = require('../misc/models/audit_log')(sequelize, Sequelize);

//Role Management
const Role = require('../user-management/models/role')(sequelize, Sequelize);
const RoleControl = require('../user-management/models/role_control')(
  sequelize,
  Sequelize
);
const RoleType = require('../user-management/models/role_type')(
  sequelize,
  Sequelize
);

//Form Management
const Form = require('../form-management/models/form')(sequelize, Sequelize);
const FormReport = require('../reporting/models/form_report')(
  sequelize,
  Sequelize
);
const FormReportValue = require('../reporting/models/form_report_value')(
  sequelize,
  Sequelize
);

// Rule Setup
const BaseUnit = require('../risk-rule-setup/models/base_unit')(
  sequelize,
  Sequelize
);
const Likelihood = require('../risk-rule-setup/models/likelihood')(
  sequelize,
  Sequelize
);
const Impact = require('../risk-rule-setup/models/impact')(
  sequelize,
  Sequelize
);
const RiskArea = require('../risk-rule-setup/models/risk_area')(
  sequelize,
  Sequelize
);
const RiskAreaParent = require('../risk-rule-setup/models/risk_area_parent')(
  sequelize,
  Sequelize
);
const RiskAreaParticular = require('../risk-rule-setup/models/risk_area_particular')(
  sequelize,
  Sequelize
);
const RiskAreaTracedBy = require('../risk-rule-setup/models/risk_area_traced_by')(
  sequelize,
  Sequelize
);
const RiskAreaTrigger = require('../risk-rule-setup/models/risk_area_trigger')(
  sequelize,
  Sequelize
);
const RiskAreaLikelihoodRule = require('../risk-rule-setup/models/risk_area_likelihood_rule')(
  sequelize,
  Sequelize
);
const RiskAreaInstanceRule = require('../risk-rule-setup/models/risk_area_likelihood_instance_rule')(
  sequelize,
  Sequelize
);
const RiskAreaImpactRule = require('../risk-rule-setup/models/risk_area_impact_rule')(
  sequelize,
  Sequelize
);

// Risk Estimation HO
const RiskEstimationHO = require('../risk-management/models/risk_estimation_ho')(
  sequelize,
  Sequelize
);
const RiskEscalationFunction = require('../risk-management/models/risk_escalation_function')(
  sequelize,
  Sequelize
);
const RiskCategorization = require('../risk-management/models/risk_categorization')(
  sequelize,
  Sequelize
);
// Risk Estimation for ALL
const RiskEstimation = require('../risk-management/models/risk_estimation')(
  sequelize,
  Sequelize
);

// Risk Register
const RiskRegister = require('../risk-management/models/risk_register')(
  sequelize,
  Sequelize
);
//* Policies Update
const PolicyUpdate = require('../risk-management/models/policies_update')(
  sequelize,
  Sequelize
);
// * Mailing Days
const MailingDays = require('../misc/models/mailing_days')(
  sequelize,
  Sequelize
);

// REPORTING PART
const BranchScore = require('../reporting/models/branch_score')(
  sequelize,
  Sequelize
);
const Grading = require('../reporting/models/grading')(sequelize, Sequelize);
const ReportDownload = require('../reporting/models/report_download')(
  sequelize,
  Sequelize
);
const MailingLogs = require('../misc/models/mail_logs')(sequelize, Sequelize);
const LossDatabaseCategories = require('../risk-management/models/loss_database_category')(
  sequelize,
  Sequelize
);

/**
 * Synchronize with database to create tables - Promise
 *
 * @method
 * @alias sync
 * @param {Object}    options         Options for syncing with database
 * @param {Boolean}   options.force   Enables/Disables the creation of tables forcefully - `WARNING!!!` (Do not set value to **true** during **production**)
 * @param {Boolean}   options.logging Enables/disabled logging of the queries executed
 */
sequelize.sync({ logging: false }).then(() => {
  console.log(`Database & tables created!`);
});

module.exports = {
  User,
  Branch,
  Province,
  ProvinceBranch,
  Department,
  Role,
  RoleControl,
  RoleType,
  LoginLog,
  DeleteLog,
  AuditLog,
  BaseUnit,
  Likelihood,
  Impact,
  RiskArea,
  RiskAreaParent,
  RiskAreaParticular,
  RiskAreaTracedBy,
  RiskAreaTrigger,
  RiskAreaLikelihoodRule,
  RiskAreaImpactRule,
  RiskAreaInstanceRule,
  RiskEstimationHO,
  RiskEscalationFunction,
  RiskCategorization,
  RiskEstimation,
  RiskRegister,
  sequelize,
  PolicyUpdate,
  //REPORTING,
  BranchScore,
  Grading,
  ReportDownload,
  //Mailing
  MailingDays,
  MailingLogs,
  Form,
  FormReport,
  FormReportValue,
  LossDatabaseCategories
};
