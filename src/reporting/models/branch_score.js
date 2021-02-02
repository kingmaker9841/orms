module.exports = (sequelize, type) => {
    return sequelize.define('branch_score', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        isDeleted: {
            type: type.BOOLEAN,
            defaultValue: false,
        },
        branchId: {
            type: type.INTEGER,
            allowNull: false,
        },
        riskAreaId: {
            type: type.INTEGER,
            allowNull: false,
        },
        riskAreaCode: {
            type: type.STRING,
            allowNull: false,
        },
        occurrence: {
            type: type.BIGINT,
        },
        amountTiming: {
            type: type.BIGINT,
        },
        financialImpact: {
            type: type.BIGINT,
        },
        actualRiskScore: {
            type: type.INTEGER,
        },
        previousRiskScore: {
            type: type.INTEGER,
        },
        estimatedRiskScore: {
            type: type.INTEGER,
        },
        startDate: {
            type: type.DATE,
        },
        createdBy: {
            type: type.INTEGER,
        },
        editedBy: {
            type: type.INTEGER,
        }
    });
}