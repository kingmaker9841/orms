/**
 * @module AuditLogs
 */

const { AuditLog, sequelize } = require("./database");

/**
 * Comparing two objects to find the change in values
 * 
 * @method
 * @param {Object} previousObject 
 * @param {Object} newObject 
 * @returns - Returns the changed value by traversing through the object
 */
function compareObjects(previousObject, newObject) {
  const valueChanges = [];
  delete previousObject.createdAt;
  delete previousObject.updatedAt;
  const keys = Object.keys(previousObject);
  keys.map((key) => {
    const previousValue = previousObject[key];
    const newValue = newObject[key];
    if (previousValue != newValue) {
      valueChanges.push({
        columnName: key,
        previousValue: JSON.stringify(previousValue),
        newValue: JSON.stringify(newValue),
      });
    }
  });
  return valueChanges;
}

/**
 * Audits the data changes into the database
 * @method
 * @param {Model} Model         Model of the table you want to audit the data
 * @param {Object} newObject    New object of the data after changes
 * @param {Object} payload      Object of the user's data
 * 
 * @returns Completes with the change in the values
 */
async function auditData(Model, newObject, payload) {
  const previousObject = await Model.findOne({
    where: { id: newObject.id },
    raw: true,
  });
  const tableName = Model.getTableName();
  if (previousObject) {
    const valueChanges = compareObjects(previousObject, newObject);
    const auditFormat = {
      userId: payload.id,
      userName: payload.name,
      itemId: newObject.id,
      tableName: tableName,
    };
    Promise.all([
      valueChanges.map((value) => {
        const auditLog = {
          ...value,
          ...auditFormat,
        };
        return AuditLog.create(auditLog);
      }),
    ]);
  }
}

module.exports = {
  auditData,
};
