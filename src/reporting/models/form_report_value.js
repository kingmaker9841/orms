module.exports = (sequelize, type) => {
    return sequelize.define("form_report_value", {
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
      formReportId: {
        type: type.INTEGER,
        allowNull: false,
      },
      name: {
        type: type.STRING,
        allowNull: false,
      },
      value: {
        type: type.TEXT,
      },
    });
  };
  