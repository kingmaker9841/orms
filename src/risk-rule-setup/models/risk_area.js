/**
 * Broad term of the risk category - LEVEL 2 risk category
 * This risk contains many risk particulars i.e. Details of error
 * @alias RiskArea 
 */
module.exports = (sequelize, type) => {
  return sequelize.define("risk_area", {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    // Name of the Risk area - LEVEL 2
    name: {
      type: type.STRING,
      allowNull: false,
    },
    // Code of the risk are code
    code: {
      type: type.STRING,
      allowNull: false,
    },
    // Risk area parent ID - ID of level 1 category
    riskAreaParentId: {
      type: type.INTEGER,
      allowNull: false,
    },
    isActive: {
      type: type.BOOLEAN,
      defaultValue: true,
    },
    isDeleted: {
      type: type.BOOLEAN,
      defaultValue: false,
    },
    createdBy: {
      type: type.INTEGER,
    },
    editedBy: {
      type: type.INTEGER,
    },
  });
};
