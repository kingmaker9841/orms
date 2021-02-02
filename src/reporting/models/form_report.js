module.exports = (sequelize, type) => {
    return sequelize.define("form_report", {
      id: {
        autoIncrement: true,
        type: type.INTEGER,
        primaryKey: true,
      },
      isDeleted: {
        type: type.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      formId: {
        type: type.INTEGER,
        allowNull: false,
      },
      createdBy: {
        type: type.INTEGER,
      },
      editedBy: {
        type: type.INTEGER,
      },
    });
  };
  