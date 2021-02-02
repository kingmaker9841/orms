/**
 * Likelihood in risk assessment matrix
 * @alias Likelihood
 */
module.exports = (sequelize, type) => {
    return sequelize.define('likelihood', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: type.STRING(40),
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
        }
    });
}