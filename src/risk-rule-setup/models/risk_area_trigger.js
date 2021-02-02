/**
 * How the risk was occurred?
 * eg: Staff negligence, Lack of training, etc.
 * @alias RiskAreaTrigger
 */
module.exports = (sequelize, type) => {
    return sequelize.define('risk_area_trigger', {
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
        lossDatabaseCategoryId: {
            type: type.INTEGER
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