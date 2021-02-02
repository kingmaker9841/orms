module.exports = (sequelize, type) => {
    return sequelize.define('department', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        isDeleted: {
            type: type.BOOLEAN,
            defaultValue: false,
        },
        level: {
            type: type.INTEGER,
        },
        name: {
            type: type.STRING,
        },
        parentId: {
            type: type.INTEGER,
        },
        colorCode: {
            type: type.STRING(10),
        },
        createdBy: {
            type: type.INTEGER
        },
        editedBy: {
            type: type.INTEGER
        }
    });
}