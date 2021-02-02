module.exports = (sequelize, type) => {
    return sequelize.define('audit_log', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        userId: {
            type: type.INTEGER,
        },
        userName: {
            type: type.STRING,
        },
        itemId: {
            type: type.INTEGER,
        },
        tableName: {
            type: type.STRING,
        },
        columnName: {
            type: type.STRING,
        },
        previousValue: {
            type: type.TEXT,
        },
        newValue: {
            type: type.TEXT,
        }
    })
}
