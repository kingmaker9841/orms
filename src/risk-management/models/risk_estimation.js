/**
 * Risk estimation data storing for each branch
 * @alias RiskEstimation
 */
module.exports = (sequelize, type) => {
    return sequelize.define('risk_estimation', {
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
            type: type.STRING,
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
        remarks: {
            type: type.TEXT,
        },
        createdBy: {
            type: type.INTEGER,
        },
        editedBy: {
            type: type.INTEGER,
        }
    });
}