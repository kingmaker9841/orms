module.exports = (sequelize, type) => {
    return sequelize.define('grading', {
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
        },
        riskAreaId: {
            type: type.INTEGER,
        },
        type: {
            type: type.STRING,
        },
        startDate: {
            type: type.DATE,
        },
        estimatedVsActual: {
            type: type.STRING,
        },
        previousVsActual: {
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