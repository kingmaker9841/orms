module.exports = (sequelize, type) => {
    return sequelize.define('delete_log', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        deletedItemId: {
            type: type.INTEGER,
        },
        deletedItemType: {
            type: type.STRING(20)
        },
        deletedOn: {
            type: type.DATE,
        },
        deletedBy: {
            type: type.STRING(40),
        },
        deletedById: {
            type: type.INTEGER,
        }
    })
}
