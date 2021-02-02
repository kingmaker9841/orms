module.exports = (sequelize, type) => {
  return sequelize.define("form", {
    id: {
      type: type.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    isDeleted: {
      type: type.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    isActive: {
      type: type.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    type: {
      type: type.STRING(20),
      defaultValue: "dynamic",
    },
    name: {
      type: type.STRING,
      allowNull: false,
    },
    description: {
      type: type.STRING,
      allowNull: false,
    },
    tag: {
      type: type.STRING,
    },
    formData: {
      type: type.TEXT,
    },
    hasReport: {
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
