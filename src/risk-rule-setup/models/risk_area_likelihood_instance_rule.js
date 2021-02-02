/**
 * Stores Risk likelihood rules for type instances in risk particular
 * @alias RiskAreaInstanceRule
 */
module.exports = (sequelize, type) => {
    return sequelize.define('risk_area_likelihood_instance_rule', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        isDeleted: {
            type: type.BOOLEAN,
            defaultValue: false,
        },
        riskAreaId: {
            type: type.STRING,
            allowNull: false,
        },
        likelihoodId: {
            type: type.INTEGER,
            allowNull: false,
        },
        lowerLimit: {
            type: type.INTEGER,
        },
        upperLimit: {
            type: type.INTEGER,
        },
        createdBy: {
            type: type.INTEGER,
        },
        editedBy: {
            type: type.INTEGER,
        }
    });
}