/**
 * Stores the Risk Estimation for the head office branch. THis also stores the weight of the each risk areas.
 * @alias RiskEstimationHO
 */
module.exports = (sequelize, type) => {
    return sequelize.define('risk_estimation_ho', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        isActive: {
            type: type.BOOLEAN,
            defaultValue: true,
        },
        branchId: {
            type: type.INTEGER,
        },
        riskAreaId: {
            type: type.INTEGER,
        },
        previousRiskScore: {
            type: type.INTEGER,
        },
        likelihood: {
            type: type.INTEGER,
        },
        impact: {
            type: type.INTEGER,
        },
        policiesAndProcedure: {
            type: type.STRING,
        },
        weight: {
            type: type.INTEGER,
        },
        remarks: {
            type: type.TEXT,
        },
        reportingFrequency: {
            type: type.STRING,
        },
        responsibility: {
            type: type.STRING,
        },
        createdBy: {
            type: type.INTEGER,
        },
        editedBy: {
            type: type.INTEGER,
        }
    });
}