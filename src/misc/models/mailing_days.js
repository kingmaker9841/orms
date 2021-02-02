module.exports = (sequelize, type) => {
  return sequelize.define("mailing_days", {
    id: {
      type: type.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      
    },
    makerDays: {
      type: type.INTEGER
    },
    checkerDays: {
      type: type.INTEGER
    },
    approverDays: {
      type: type.INTEGER
    },
    createdBy: {
      type: type.INTEGER
    }
  });
};
