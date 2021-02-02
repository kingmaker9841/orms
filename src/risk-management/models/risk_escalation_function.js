/**
 * Stores the risk escalation function matrix. Works as a 2 dimensional array matrix.
 * This contain all the escalation rules to escalate the category after risk score calculation.
 * @alias RiskEscalationFunction
 */
module.exports = (sequelize, type) => {
    return sequelize.define('risk_escalation_function', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        riskCategorizationId: {
            type: type.INTEGER,
            allowNull: false,
        },
        riskCategorizationFunctionId: {
            type: type.INTEGER,
            allowNull: false,
        },
        lowerLimit: {
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