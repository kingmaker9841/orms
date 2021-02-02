/**
 * Stores the categorization range to calculate the risk category for risk score.
 * @alias RiskCategorization
 */
module.exports = (sequelize, type) => {
    return sequelize.define('risk_categorization', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        isDeleted: {
            type: type.BOOLEAN,
            defaultValue: false,
        },
        name: {
            type: type.STRING,
            allowNull: false,
        },
        lowerLimit: {
            type: type.INTEGER,
            allowNull: false,
        },
        upperLimit: {
            type: type.INTEGER,
            allowNull: false,
        },
        createdBy: {
            type: type.INTEGER,
        },
        editedBy: {
            type: type.INTEGER,
        }
    });
}