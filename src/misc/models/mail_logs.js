module.exports = (sequelize, type) => {
  return sequelize.define("mail_logs", {
    id: {
      type: type.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    seen: {
      type: type.BOOLEAN,
      defaultValue: false
    },
    branchId: {
      type: type.INTEGER
    },
    mail: {
      type: type.STRING
    },
    role: {
      type: type.STRING
    },
    sendAt: {
      type: type.DATE
    }
  });
};
