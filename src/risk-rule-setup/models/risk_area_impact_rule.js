/**
 * Stores Risk impact rules
 * @alias RiskAreaImpactRule
 */
module.exports = (sequelize, type) => {
    return sequelize.define('risk_area_impact_rule', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        riskAreaParticularId: {
            type: type.INTEGER,
            allowNull: false,
        },
        impactId: {
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