module.exports = (sequelize, type) => {
    return sequelize.define('role', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        isDeleted: {
            type: type.BOOLEAN,
            defaultValue: false,
        },
        name: {
            type: type.STRING,
        },
        isMaker: {
            type: type.BOOLEAN,
            defaultValue: false,
        },
        isChecker: {
            type: type.BOOLEAN,
            defaultValue: false,
        },
        isApprover: {
            type: type.BOOLEAN,
            defaultValue: false,
        },
        isProvinceAdmin: {
            type: type.BOOLEAN,
            defaultValue: false
        },
        isAdmin: {
            type: type.BOOLEAN,
            defaultValue: false,
        },
        createdBy: {
            type: type.INTEGER,
        },
        editedBy: {
            type: type.INTEGER,
        },
    })
}