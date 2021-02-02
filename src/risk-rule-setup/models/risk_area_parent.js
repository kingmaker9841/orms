/**
 * Risk area parent for level 1 of the risk category
 * @alias RiskAreaParent
 */
module.exports = (sequelize, type) => {
  return sequelize.define("risk_area_parent", {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    // Name of the risk level 1
    name: {
      type: type.STRING,
      allowNull: false,
    },
    // Code for the risk parent
    code: {
      type: type.STRING,
      allowNull: false,
    },
    // Parent ID if the level for the risk area parent is increased
    parentId: {
      type: type.INTEGER,
    },
    // Level of the risk area parent....default is 0
    level: {
      type: type.INTEGER,
      defaultValue: 0,
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
