/**
 * Stores Risk likelihood rules for type range in risk particular
 * @alias RiskAreaLikelihoodRule
 */
module.exports = (sequelize, type) => {
    return sequelize.define('risk_area_likelihood_rule', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        riskAreaParticularId: {
            type: type.INTEGER,
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