/**
 * Data storing for the risk register, also known as LOSS EVENT
 * @alias RiskRegister
 * @example
 * // If there was a faulty transaction on 2020-09-10 and the risk was identified on 2020-09-20.
 * // Then the risk was ongoing certain approval process after which the risk was mitigate on 2020-09-30.
 * // The value for the risk register will be:
 * {
 *  branchId: <BRANCH_ID>,
 *  status "Approved",
 *  transactionDate: "2020-09-10",
 *  riskAreaCode: "RA01",
 *  riskAreaParticularCode: "CASH001",
 *  riskAreaParticular: "Vault cash access", //Detail of error
 *  occurrence: 1, 
 *  amountTiming: "20000", //Amount involved
 *  baseUnitId: 1, //Unit id of the risk register event, for this AMOUNT(rupees)
 *  financialImpact: 0,
 *  nonFinancialImpact: "",
 *  relatedAccount: <ACCOUNT_NO>,
 *  relatedStaff: "Inputter/Authorizer",
 *  tracedDate: "2020-09-20",
 *  tracedBy: "Related Staff",
 *  rectificationDate: "2020-09-30",
 *  remarks: "Remarks",
 *  mitigationAction: "How the risk was mitigated",
 * }
 */
module.exports = (sequelize, type) => {
  return sequelize.define("risk_register", {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    // Status of the each risk register event
    // [Draft, Pending, Unapproved, Approved]
    // When data is Approved it will not be susceptible to further changes
    status: {
      type: type.STRING(40),
      defaultValue: "Draft"
    },
    branchId: {
      type: type.INTEGER
    },
    // The transaction date on which Risk was occurred
    transactionDate: {
      type: type.DATE
    },
    // Risk area code for the LEVEL 2 risk category
    riskAreaCode: {
      type: type.STRING /*  */,
      allowNull: false
    },
    // Risk particular code for the LEVEL 3 risk category
    // This is the one where the Risk rule are applied
    riskAreaParticularCode: {
      type: type.STRING,
      defaultValue: "others"
    },
    // Risk particular value for the LEVEL 4 risk category
    // Details of error
    riskAreaParticular: {
      type: type.STRING
    },
    // The value on HOW the risk was occurred
    // eg: Staff negligence, Inadequate training
    riskTrigger: {
      type: type.STRING
    },
    // No of time the particular risk was occurred
    occurrence: {
      type: type.INTEGER
    },
    // Amount or Timing involved on the particular risk
    amountTiming: {
      type: type.INTEGER
    },
    // Unit of the risk particular event
    baseUnitId: {
      type: type.INTEGER
    },
    // Impacted amount due to the risk
    financialImpact: {
      type: type.STRING
    },
    // Impacted result not necessarily quantifiable value involved 
    nonFinancialImpact: {
      type: type.STRING
    },
    // Related account number for the transaction on risk occurred
    relatedAccount: {
      type: type.STRING
    },
    // Related staff by which risk occurred
    // Inputter/Authorizer for the risk event
    relatedStaff: {
      type: type.STRING
    },
    // Date on which risk was identified
    tracedDate: {
      type: type.DATE
    },
    // How the risk was identified?
    // eg: Internal Audit, Customer Report, etc.
    tracedBy: {
      type: type.STRING
    },
    // Date on which risk was mitigated
    rectificationDate: {
      type: type.DATE
    },
    // Remarks for the particular risk event
    remarks: {
      type: type.TEXT
    },
    // Mitigation action for the particular risk event
    mitigationAction: {
      type: type.TEXT
    },
    // Loss Database Generated or not
    isLossDatabaseGenerated: {
      type: type.BOOLEAN,
      defaultValue: false
    },
    createdBy: {
      type: type.INTEGER
    },
    editedBy: {
      type: type.INTEGER
    }
  });
};
