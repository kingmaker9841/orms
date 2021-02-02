/**
 * Where the risk is traced?
 * Storing the traced by for the risk particular
 * eg: Internal Audit, External Audit, etc.
 * @alias RiskAreaTracedBy
 */
module.exports = (sequelize, type) => {
    return sequelize.define('risk_area_traced_by', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: type.STRING,
            allowNull: false,
        },
        riskAreaId: {
            type: type.INTEGER,
            allowNull: false,
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