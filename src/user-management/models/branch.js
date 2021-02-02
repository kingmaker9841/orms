module.exports = (sequelize, type) => {
  return sequelize.define("branch", {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    isDeleted: {
      type: type.BOOLEAN,
      defaultValue: false
    },
    name: {
      type: type.STRING(40)
    },
    address: {
      type: type.STRING
    },
    phoneNumber: {
      type: type.STRING(20)
    }
  });
};
