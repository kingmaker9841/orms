module.exports = (sequelize, type) => {
    return sequelize.define('report_download', {
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
        type: {
            type: type.STRING,
            allowNull: false,
        },
        startDate: {
            type: type.DATE,
        },
        path: {
            type: type.STRING,
        },
        description: {
            type: type.TEXT,
        },
        createdBy: {
            type: type.INTEGER,
        },
    });
}