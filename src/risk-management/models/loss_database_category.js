module.exports = (sequelize, type) => {
  return sequelize.define('loss_database_categories', {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: type.STRING,
    },
    createdBy: {
      type: type.INTEGER,
    },
    editedBy: {
      type: type.INTEGER,
    },
  });
};
