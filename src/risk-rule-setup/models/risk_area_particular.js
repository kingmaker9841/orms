/**
 * Detail of error
 * @alias RiskParticular
 */
module.exports = (sequelize, type) => {
  return sequelize.define("risk_area_particular", {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    // Title of the Risk area particular i.e. LEVEL 3 category
    title: {
      type: type.STRING,
      allowNull: false,
    },
    // Details of errors for the risk area particular i.e. LEVEL 4 category
    // Not normalized
    // When value = "ABC|||PQR|||XYZ"
    // Then details of error are [ABC, PQR, XYZ]
    name: {
      type: type.TEXT,
      allowNull: false,
    },
    // Code of the Risk area particular so that the roles can be made multiple
    code: {
      type: type.STRING,
      allowNull: false,
    },
    riskAreaId: {
      type: type.INTEGER,
      allowNull: false,
    },
    // Type of the risk particular [range, instance]
    // range - range based risk rule for this - quantifiable risk rules
    // instance - instance based risk rule for this - non-quantifiable risk rules 
    type: {
      type: type.STRING(20),
    },
    // Unit of the risk area particular
    baseUnitId: {
      type: type.INTEGER,
      defaultValue: 1,
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
