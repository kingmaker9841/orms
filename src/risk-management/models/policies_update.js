/**
 * Policy data for the Head office. This stores the information, not used anywhere
 * @alias HeadOfficePolicy
 */
module.exports = (sequelize, type) => {
  return sequelize.define("policies", {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    isActive: {
      type: type.BOOLEAN,
      defaultValue: true,
    },
    branchId: {
      type: type.INTEGER,
    },
    riskAreaId: {
      type: type.INTEGER,
    },
    policyApproval: {
      type: type.DATE,
    },
    policyRevision: {
      type: type.DATE,
    },
    policyDeadline: {
      type: type.DATE,
    },
    manualApproval: {
      type: type.DATE,
    },
    manualRevision: {
      type: type.DATE,
    },
    manualDeadline: {
      type: type.DATE,
    },
    othersApproval: {
      type: type.DATE,
    },
    othersRevision: {
      type: type.DATE,
    },
    othersDeadline: {
      type: type.DATE,
    },
    remarks: {
      type: type.STRING,
    },
    createdBy: {
      type: type.INTEGER,
    },
    editedBy: {
      type: type.INTEGER,
    },
  });
};
